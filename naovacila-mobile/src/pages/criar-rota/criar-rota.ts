import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Storage } from '@ionic/storage';
import { RotaServicoProvider } from '../../providers/rota-servico/rota-servico';
import { HomePage } from '../home/home';

declare var google;

@Component({
  selector: 'page-criar-rota',
  templateUrl: 'criar-rota.html',
})
export class CriarRotaPage {

  autocompleteItems;
  autocomplete;
  service = new google.maps.places.AutocompleteService();
  listaHistorico = [];
 
  constructor (public viewCtrl: ViewController, private zone: NgZone
    ,public nativeGeocoder: NativeGeocoder, public navCtrl: NavController
    , private nativeStorage: Storage, public rotaServico: RotaServicoProvider) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };

  }

  ionViewDidLoad(){
    this.rotaServico.carregarHistoricoRotas()
    .then((data)=>{
      if(data != null){
        this.listaHistorico = JSON.parse(data);
      }
    });
  }
 
  chooseItem(item: any) {
    this.nativeGeocoder.forwardGeocode(item)
      .then((coordinates: NativeGeocoderForwardResult) => {
        console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude)
        this.rotaServico.salvarRotaNoHistorico(item);
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

  doYourStuff()
{
    this.navCtrl.pop();  // remember to put this to add the back button behavior
}

}
