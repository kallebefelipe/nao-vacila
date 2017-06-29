import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
    
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
    this.navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){
 
    let latLng = new google.maps.LatLng(-8.0543, -34.8813);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false
    }
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    }, (err) => {
      console.log(err);
    });
 
  }

}
