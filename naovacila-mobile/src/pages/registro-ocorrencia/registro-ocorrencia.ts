import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { OcorrenciaServicoProvider } from '../../providers/ocorrencia-servico/ocorrencia-servico';

declare var google;

@IonicPage()
@Component({
  selector: 'page-registro-ocorrencia',
  templateUrl: 'registro-ocorrencia.html',
})
export class RegistroOcorrenciaPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  hoje:any;
  hora:any;
  titulo:any;
  descricao:any;
  endereco:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public ocorrenciaServico: OcorrenciaServicoProvider, private nativeGeocoder: NativeGeocoder) {
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var min = today.getMinutes();

    dia = dd.toString();
    if(dd<10) {
        var dia = "0"+dd;
    } 

    mes = mm.toString();
    if(mm<10) {
        var mes = '0'+mm;
    } 

    h = hh.toString();
    if(hh<10) {
        var h = "0"+hh;
    } 

    minutos = min.toString();
    if(min<10) {
        var minutos = '0'+min;
    } 

    this.hoje = yyyy+"-"+mes+"-"+dia;
    this.hora = h+":"+minutos;
  }

  salvarOcorrencia(){
    
    this.ocorrenciaServico.salvarOcorrencia(this.titulo, this.descricao)
    .subscribe(
        data => {
          this.navCtrl.setRoot(HomePage);
          
        },
        err => {
          alert("Erro ao salvar ocorrência. Tente novamente.")
          console.log('[ERRO] ao carregar ocorrências no serviço' + err);
        },
        ()=> console.log("serviço finalizado")
      );
  }

  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){
 
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

      let marker = new google.maps.Marker({
        map: this.map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });

       google.maps.event.addListener(marker, 'dragend', (event) => {
        console.log("marcador arrastado" + marker.getPosition().lat() + "- " + marker.position);
        this.reverseGeocode(marker.getPosition().lat(), marker.getPosition().lng());
      });
      
      this.reverseGeocode(position.coords.latitude, position.coords.longitude);
      
      }, (err) => {
      console.log(err);
    });
 
  }

  reverseGeocode(latitude, longitude){
    this.nativeGeocoder.reverseGeocode(latitude, longitude)
        .then((result: NativeGeocoderReverseResult) => {
          console.log('The address is ' + result.street + ' in ' + result.countryCode + " " + JSON.stringify(result));
          this.endereco = result.street + ", " +result.houseNumber + " - " + result.district;
        })
        .catch((error: any) => console.log("erro no geocoder reverso"+ error));
    
  }

}
