import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TipoOcorrenciaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tipo-ocorrencia',
  templateUrl: 'tipo-ocorrencia.html',
})
export class TipoOcorrenciaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  abrirregistroOcorrencia(id_tipocorrencia){
    this.navCtrl.push('RegistroOcorrenciaPage', {id_tipo: id_tipocorrencia})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TipoOcorrenciaPage');
  }

}
