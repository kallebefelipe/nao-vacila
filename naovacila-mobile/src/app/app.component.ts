import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import { MeusRadaresPage } from '../pages/meus-radares/meus-radares';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage, public push: Push, public alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Here we will check if the user is already logged in
      // because we don't want to ask users to log in each time they open the app
      let env = this;
      storage.get('user')
      .then(function (data) {
        // user is previously logged and we have his data
        // we will let him access the app
        env.nav.push(TabsPage);
        splashScreen.hide();
      }, function (error) {
        //we don't have the user data so we will ask him to log in
        env.nav.setRoot(LoginPage);

        splashScreen.hide();
      });
      // env.nav.setRoot(LoginPage);
      statusBar.styleDefault();
      this.pushsetup();
    });
  }

  pushsetup() {
    const options: PushOptions = {
     android: {
         senderID: '550281591965' 
     },
     ios: {
         alert: 'true',
         badge: true,
         sound: 'false'
     },
     windows: {}
  };
 
  const pushObject: PushObject = this.push.init(options);
 
  pushObject.on('notification').subscribe((notification: any) => {
    if (notification.additionalData.foreground) {
      let youralert = this.alertCtrl.create({
        title: 'New Push notification',
        message: notification.message
      });
      youralert.present();
    }
  });
 
  pushObject.on('registration').subscribe((registration: any) => {
     //do whatever you want with the registration ID
     console.log(registration);
     this.storage.set("token", registration.registrationId);
  });
 
  pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }
}
