import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { OcorrenciaServicoProvider } from '../../providers/ocorrencia-servico/ocorrencia-servico';
import { Storage } from '@ionic/storage';

declare var google;

@IonicPage()
@Component({
  selector: 'page-registro-ocorrencia',
  templateUrl: 'registro-ocorrencia.html',
})
export class RegistroOcorrenciaPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  hoje: any;
  hora: any;
  titulo: any;
  descricao: any;
  endereco: any;
  id_tipoOcorrencia: any;
  latitude: any;
  longitude: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation,
    public ocorrenciaServico: OcorrenciaServicoProvider, private nativeGeocoder: NativeGeocoder,
    public storage: Storage) {

    this.id_tipoOcorrencia = this.navParams.get("id_tipo");
    console.log("INFO - id tipo ocorrencia é " + this.id_tipoOcorrencia);

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var min = today.getMinutes();

    dia = dd.toString();
    if (dd < 10) {
      var dia = "0" + dd;
    }

    mes = mm.toString();
    if (mm < 10) {
      var mes = '0' + mm;
    }

    h = hh.toString();
    if (hh < 10) {
      var h = "0" + hh;
    }

    minutos = min.toString();
    if (min < 10) {
      var minutos = '0' + min;
    }

    this.hoje = yyyy + "-" + mes + "-" + dia;
    this.hora = h + ":" + minutos;
  }

  salvarOcorrencia() {
    this.storage.get('user')
      .then(data => {
        console.log('INFO registro ocorrencia user ' + JSON.stringify(data));

        this.ocorrenciaServico.salvarOcorrencia(this.id_tipoOcorrencia, this.descricao, this.latitude, this.titulo, this.hoje, this.endereco, this.longitude, JSON.parse(data).id, this.hora)
          .subscribe(
          data => {
            console.log("INFO - sucesso ao salvar ocorrencia" + data);
            this.navCtrl.setRoot(HomePage, { latitude: this.latitude, longitude: this.longitude });

          },
          err => {
            alert("Erro ao salvar ocorrência. Tente novamente.")
            console.log('[ERRO] ao carregar ocorrências no serviço' + err);
          },
          () => console.log("serviço finalizado")
          );
      })

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      switch (this.id_tipoOcorrencia) {
        case 1: { //
          var pinColor = "d87e29";
        } break;
        case 2: {
          var pinColor = "f7df2e";
        } break;
        case 3: {
          var pinColor = "a6f72d";
        } break;
        case 4: {
          var pinColor = "17c4b8";
        } break;
        case 5: {
          var pinColor = "103cea";
        } break;
        case 6: {
          var pinColor = "711fc4";
        } break;
        case 7: {
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
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });

      // let marker = new google.maps.Marker({
      //   map: this.map,
      //   draggable: true,
      //   animation: google.maps.Animation.DROP,
      //   position: this.map.getCenter()
      // });

      google.maps.event.addListener(marker, 'dragend', (event) => {
        console.log("marcador arrastado" + marker.getPosition().lat() + "- " + marker.position);
        this.reverseGeocode(marker.getPosition().lat(), marker.getPosition().lng());
      });

      this.reverseGeocode(position.coords.latitude, position.coords.longitude);

    }, (err) => {
      console.log(err);
    });

  }

  reverseGeocode(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude)
      .then((result: NativeGeocoderReverseResult) => {
        console.log('The address is ' + result.street + ' in ' + result.countryCode + " " + JSON.stringify(result));
        this.endereco = result.street + ", " + result.houseNumber + " - " + result.district;

        this.latitude = latitude;
        this.longitude = longitude;

      })
      .catch((error: any) => console.log("erro no geocoder reverso" + JSON.stringify(error)));

  }

}
