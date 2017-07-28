import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';
import { OcorrenciaServicoProvider } from '../../providers/ocorrencia-servico/ocorrencia-servico';
import { Geolocation } from '@ionic-native/geolocation';
import { CriarRotaPage } from '../criar-rota/criar-rota';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  ocorrencias: any;
  loading= true;
 
  constructor(public navCtrl: NavController, public ocorrenciaServico: OcorrenciaServicoProvider, public geolocation: Geolocation, public navParams: NavParams) {
    this.loadMap(); 
    
  }
 
  ionViewDidLoad(){
    // this.loadMap();  
    this.loading=true;
    console.log("INFO - valor lat e long" +  this.navParams.get("latitude") + " ," + this.navParams.get("longitude"));
    this.carregarRota();
    
  }

  carregarRota(){
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();

    directionsDisplay.setMap(this.map);

    directionsDisplay.setDirections(this.navParams.get("requisicaoRota"));
  
  }
 
  loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {
      console.log('[INFO] posição atual: ' + position.coords.latitude + "," + position.coords.longitude);
      

      let latLng;

      if(this.navParams.get('latitude')){
        latLng = new google.maps.LatLng(this.navParams.get('latitude'),this.navParams.get('longitude'));
      }
      else{
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

      let latLngMarcador1 = new google.maps.LatLng(-8.0264688, -34.9177227);
      let latLngMarcador2 = new google.maps.LatLng(-8.1368627, -34.9115769);
    
      // let marker = new google.maps.Marker({
      //     map: this.map,
      //     animation: google.maps.Animation.DROP,
      //     position: latLngMarcador1
      // });

      // let marker2 = new google.maps.Marker({
      //     map: this.map,
      //     animation: google.maps.Animation.DROP,
      //     position: latLngMarcador2
      // });
      
      // var directionsDisplay = new google.maps.DirectionsRenderer();
      // var directionsService = new google.maps.DirectionsService();

      // directionsDisplay.setMap(this.map);

      // var request = {
      //   origin:latLngMarcador1,
      //   destination:latLngMarcador2,
      //   travelMode: 'DRIVING'
      // };

      // directionsService.route(request, function(response, status) {
      //   console.log ('INFO - response do directionService' + JSON.stringify(response))
      //   if (status == 'OK') {
      //     directionsDisplay.setDirections(response);
      //   }
      // });
      
    }, (err) =>{
      console.log('[ERRO] ao carregar localização' + err);
    });
  }

  carregarOcorrencias(){
    this.ocorrenciaServico.carregarOcorrencias()
      .subscribe(
        data => {
          this.ocorrencias = data;
          for(var i = 0; i<this.ocorrencias.length; i++){
            this.adicionarMarcador(this.ocorrencias[i]);
          }
        },
        err => {
          console.log('[ERRO] ao carregar ocorrências no serviço' + err);
        },
        ()=> {
          this.loading = false;
          console.log("serviço finalizado")
        }
      );
  }

  abrirRegistrarOcorrencia(){
    this.navCtrl.push('TipoOcorrenciaPage');
  }

  abrirCriarRota(){
    this.navCtrl.push(CriarRotaPage);
  }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
  
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  adicionarMarcador(ocorrencia){
    console.log("INFO - adicionando marcador para ocorrencia: " + ocorrencia.titulo + "coordenadas: " + ocorrencia.latitude + "," + ocorrencia.longitude);
    
    let latLng = new google.maps.LatLng(ocorrencia.latitude, ocorrencia.longitude);
    
    let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });
 
    let content = "<h4>"+ocorrencia.titulo+ "</h4> <p>" +ocorrencia.descricao+ "</p>" ;          
 
    this.addInfoWindow(marker, content);
  }

  centralizarMinhaLocalizacao(){
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.map.setCenter(latLng);

    })

  }

}
