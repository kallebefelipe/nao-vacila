import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { GooglePlus } from '@ionic-native/google-plus';

/**
 * Generated class for the ConfigPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: Facebook, public googlePlus: GooglePlus, public NativeStorage: Storage) {
  }

  doFbLogout(){
   var nav = this.navCtrl;
   let env = this;
   this.fb.logout()
   .then(function(response) {
     //user logged out so we will remove him from the NativeStorage
     env.NativeStorage.remove('user');
     nav.push(LoginPage);
   }, function(error){
     console.log(error);
   });
 }

//  doGoogleLogout(){
//     let nav = this.navCtrl;
//     let env = this;
//     this.googlePlus.logout()
//     .then(function (response) {
//       this.nativeStorage.remove('user');
//       nav.push(LoginPage);
//     },function (error) {
//       console.log(error);
//     })
//   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
  }

}
