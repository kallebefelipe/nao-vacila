import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import {RadarPage} from '../radar/radar';
import {ConfigPage} from '../config/config';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = RadarPage;
  tab3Root = ConfigPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
}
