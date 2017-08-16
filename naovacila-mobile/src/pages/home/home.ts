import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { OcorrenciaServicoProvider } from '../../providers/ocorrencia-servico/ocorrencia-servico';
import { Geolocation } from '@ionic-native/geolocation';
import { CriarRotaPage } from '../criar-rota/criar-rota';
import { Http } from '@angular/http';


declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  map: any;
  ocorrencias: any;
  loading = true;
  exibirPanelDirection = false;
  loader: any;

  constructor(public navCtrl: NavController, public ocorrenciaServico: OcorrenciaServicoProvider, public geolocation: Geolocation,
    public navParams: NavParams, public platform: Platform, public http: Http,
    public loadingCtrl: LoadingController) {
    this.loadMap();
  }

  ionViewDidLoad() {
    
    this.loading = true;
    console.log("INFO - valor lat e long" + this.navParams.get("latitude") + " ," + this.navParams.get("longitude"));
    if (this.navParams.get("requisicaoRota")) {
      this.exibirPanelDirection = true;
    }

   

  }

  carregarRota(rota) {
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();
    directionsDisplay.setPanel(this.directionsPanel.nativeElement);

    directionsDisplay.setMap(this.map);
    console.log('ENTROU NO METODO CARREGARROTA' + rota);

    directionsDisplay.setDirections(rota);

  }

  loadMap() {
    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then((position) => {
        console.log('[INFO] posição atual: ' + position.coords.latitude + "," + position.coords.longitude);


        let latLng;

        if (this.navParams.get('latitude')) {
          latLng = new google.maps.LatLng(this.navParams.get('latitude'), this.navParams.get('longitude'));
        }
        else {
          latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        }


        let mapOptions = {
          center: latLng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          zoomControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.carregarOcorrencias();
        if (this.navParams.get("requisicaoRota")) {
          this.carregarRota(this.navParams.get("requisicaoRota"));
        }

        var directionsDisplay = new google.maps.DirectionsRenderer();


        directionsDisplay.setMap(this.map);


      }, (err) => {
        console.log('[ERRO] ao carregar localização ' + JSON.stringify(err));
      });
    })

  }

  carregarOcorrencias() {
    this.presentLoading();
    this.ocorrenciaServico.carregarOcorrencias()
      .subscribe(
      data => {
        this.ocorrencias = data;
        for (var i = 0; i < this.ocorrencias.length; i++) {
          this.adicionarMarcador(this.ocorrencias[i]);
        }
        this.loader.dismiss();
      },
      err => {
        console.log('[ERRO] ao carregar ocorrências no serviço' + err);
        this.loader.dismiss();
      },
      () => {
        this.loading = false;
        console.log("serviço finalizado")
      }
      );
  }

  abrirRegistrarOcorrencia() {
    this.navCtrl.push('TipoOcorrenciaPage');
  }

  abrirCriarRota() {
    this.navCtrl.push(CriarRotaPage);
  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  adicionarMarcador(ocorrencia) {
    console.log("INFO - adicionando marcador para ocorrencia: " + ocorrencia.titulo + " tipo: " + ocorrencia.id_tipo + "coordenadas: " + ocorrencia.latitude + "," + ocorrencia.longitude);

    let latLng = new google.maps.LatLng(ocorrencia.latitude, ocorrencia.longitude);

    switch (ocorrencia.id_tipo) {
        case "1": {
          var pinColor = "d87e29";
        } break;
        case "2": {
          console.log('tipo 2 cor');
          var pinColor = "f7df2e";
        } break;
        case "3": {
          var pinColor = "a6f72d";
        } break;
        case "4": {
          var pinColor = "17c4b8";
        } break;
        case "5": {
          var pinColor = "103cea";
        } break;
        case "6": {
          var pinColor = "711fc4";
        } break;
        case "7": {
          var pinColor = "d317bd";
        } break;
        case 8: {
          var pinColor = "ec1f32";
        } break;
        case 9: {
          var pinColor = "67676f";
        } break;
        case 10: {
          var pinColor = "0a5312";
        } break;
        default: var pinColor = "FE7569";
      }

      var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34));

    let marker = new google.maps.Marker({
      icon: pinImage,
      map: this.map,
      
      //animation: google.maps.Animation.DROP,
      position: latLng
    });

    let content = "<h4>" + ocorrencia.titulo + "</h4> <p>" + ocorrencia.descricao + "</p>";

    this.addInfoWindow(marker, content);
  }

  centralizarMinhaLocalizacao() {
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.map.setCenter(latLng);

    })

  }

  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Carregando ocorrências..."
    });

    this.loader.present();

  }
}
