import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';
import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { HomePage } from '../pages/home/home';
import { RadarPage } from '../pages/radar/radar';
import { ConfigPage } from '../pages/config/config';
import { TabsPage } from '../pages/tabs/tabs';
import { CriarRotaPage } from '../pages/criar-rota/criar-rota';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { OcorrenciaServicoProvider } from '../providers/ocorrencia-servico/ocorrencia-servico';
import { HttpModule } from '@angular/http';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { RotaServicoProvider } from '../providers/rota-servico/rota-servico';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RadarPage,
    ConfigPage,
    TabsPage,
    LoginPage,
    CriarRotaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'voltar'
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RadarPage,
    ConfigPage,
    TabsPage,
    LoginPage,
    CriarRotaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeStorage,
    Facebook,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OcorrenciaServicoProvider,
    NativeGeocoder,
    RotaServicoProvider
  ]
})
export class AppModule {}
