import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { NativeStorage } from '@ionic-native/native-storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav : Nav;
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: NativeStorage) {
   platform.ready().then(() => {
      // Here we will check if the user is already logged in
      // because we don't want to ask users to log in each time they open the app
      let env = this;
      storage.getItem('user')
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

      statusBar.styleDefault();
    });
  }
}
