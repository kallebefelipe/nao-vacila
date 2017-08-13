import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RadarProvider } from '../../providers/radar/radar';



@IonicPage()
@Component({
  selector: 'page-meus-radares',
  templateUrl: 'meus-radares.html',
})
export class MeusRadaresPage {
  radares: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public radarServico:RadarProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeusRadaresPage');

    this.storage.get('user')
      .then(data => {
        this.radarServico.carregarRadaresUsuario(1)
          .subscribe(
          data => { 
            this.radares = data;
            console.log('INFO - lista de radares' + this.radares);
          },
          err => {
            console.log('Erro ao carregar radares do usuario' + err);
          },
          () => console.log("servico finalizado")
          );
      })
  }

  abrirRegistrarRadar(){
    this.navCtrl.push('RegistroRadarPage');
  }

}
