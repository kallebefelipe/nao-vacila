import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EstatisticasPage } from '../estatisticas/estatisticas';
import { MeusRadaresPage } from '../meus-radares/meus-radares';

/**
 * Generated class for the RadarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-radar',
  templateUrl: 'radar.html',
})
export class RadarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RadarPage');
  }

  abrirNoticias(){
    this.navCtrl.push('NoticiasPage')
  }

  abrirMinhasOcorrencias(){
    this.navCtrl.push('MinhasOcorrenciasPage')
  }

  abrirEstatisticas(){
    console.log('click abrir estatisticas');
    this.navCtrl.push(EstatisticasPage);
  }

  abrirMeusRadares(){
    this.navCtrl.push(MeusRadaresPage);
  }

  

}
