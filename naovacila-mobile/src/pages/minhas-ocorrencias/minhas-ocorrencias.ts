import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OcorrenciaServicoProvider } from '../../providers/ocorrencia-servico/ocorrencia-servico';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-minhas-ocorrencias',
  templateUrl: 'minhas-ocorrencias.html',
})
export class MinhasOcorrenciasPage {
  ocorrencias: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ocorrenciaServico: OcorrenciaServicoProvider, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinhasOcorrenciasPage');

    this.storage.get('user')
      .then(data => {
        console.log('INFO minhas ocorrencias user ' + JSON.stringify(JSON.parse(data)));

        this.ocorrenciaServico.carregarOcorrenciasUsuario(JSON.parse(data).id)
          .subscribe(
            data => {
              this.ocorrencias = data;
              console.log('INFO - lista de ocorrencias' + this.ocorrencias);
            },
            err => {
              console.log('Erro ao carregar ocorrencias do usuario' + err);
            },
            () => console.log("servico finalizado")
          );
      })
  }



}
