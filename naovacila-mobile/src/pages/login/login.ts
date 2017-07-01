import { Component } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { NativeStorage } from '@ionic-native/native-storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
 FB_APP_ID: number = 350485625371107;

  constructor(public navCtrl: NavController, public fb: Facebook, public nativeStorage: NativeStorage, private screenOrientation: ScreenOrientation) {
    //Facebook.browserInit(this.FB_APP_ID, "v2.8");
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  doFbLogin(){
    let permissions = new Array<string>();
    let nav = this.navCtrl;
    let env = this;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];


    this.fb.login(permissions)
    .then(function(response){
      console.log('entrou no login');
      let userId = response.authResponse.userID;
      let params = new Array<string>();

      //Getting name and gender properties
      env.fb.api("/me?fields=name,gender", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        env.nativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
        .then(function(){
          nav.setRoot(TabsPage);
        }, function (error) {
          console.log('erro ao salvar local'+error);
        })
      })
    }, function(error){
      console.log('erro no login'+error);
    });
  }

}
