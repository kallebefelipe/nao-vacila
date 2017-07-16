import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OcorrenciaServicoProvider } from '../../providers/ocorrencia-servico/ocorrencia-servico';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  ocorrencias: any;
 
  constructor(public navCtrl: NavController, public ocorrenciaServico: OcorrenciaServicoProvider, public geolocation: Geolocation) {
    
  }
 
  ionViewDidLoad(){
    this.loadMap();  
  }
 
  loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {
      console.log('[INFO] posição atual: ' + position.coords.latitude + "," + position.coords.longitude);
      
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
      this.carregarOcorrencias();
      
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
        ()=> console.log("serviço finalizado")
      );
  }

  abrirRegistrarOcorrencia(){
    this.navCtrl.push('TipoOcorrenciaPage');
  }

  abrirCriarRota(){
    this.navCtrl.push('CriarRotaPage');
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

}
