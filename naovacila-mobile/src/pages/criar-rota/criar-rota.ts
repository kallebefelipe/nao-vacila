import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

declare var google;

@Component({
  selector: 'page-criar-rota',
  templateUrl: 'criar-rota.html',
})
export class CriarRotaPage {

  autocompleteItems;
  autocomplete;
  service = new google.maps.places.AutocompleteService();
 
  constructor (public viewCtrl: ViewController, private zone: NgZone, public nativeGeocoder: NativeGeocoder, public navCtrl: NavController) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }
 
  chooseItem(item: any) {
    this.nativeGeocoder.forwardGeocode(item)
      .then((coordinates: NativeGeocoderForwardResult) => {
        console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude)
        this.navCtrl.push('SelecionarRotaPage', {latitude: coordinates.latitude, longitude: coordinates.longitude})
      })      
      .catch((error: any) => console.log(error));
    // this.viewCtrl.dismiss(item);
  }
  
  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: {country: 'BR'} }, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
        if(predictions){
          predictions.forEach(function (prediction) {
          me.autocompleteItems.push(prediction.description);
        });
        }
        
      });
    });
  }

}
