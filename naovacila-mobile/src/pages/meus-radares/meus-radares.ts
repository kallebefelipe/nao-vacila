import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RadarProvider } from '../../providers/radar/radar';




@Component({
  selector: 'page-meus-radares',
  templateUrl: 'meus-radares.html',
})
export class MeusRadaresPage {
  radares: any;
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, 
    public radarServico:RadarProvider, public loadingCtrl: LoadingController ) {
  }

  ionViewDidLoad() {
    this.storage.get('token')
      .then(token=>{
        console.log('INFO MeusRadaresPage token ' + token);
      })
    
    this.presentLoading();
    this.storage.get('user')
      .then(data => {
        console.log('INFO meus radares user' + JSON.stringify(JSON.parse(data)));
        this.radarServico.carregarRadaresUsuario(JSON.parse(data).id)
          .subscribe(
          data => { 
            this.radares = data;
            console.log('INFO - lista de radares' + this.radares);
            this.loader.dismiss();
          },
          err => {
            console.log('Erro ao carregar radares do usuario' + err);
            this.loader.dismiss();
          },
          () => console.log("servico finalizado")
          );
      })
  }

  abrirRegistrarRadar(){
    this.navCtrl.push('RegistroRadarPage');
  }

  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Carregando radares..."
    });

    this.loader.present();

  }

}
