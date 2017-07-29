import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RotaServicoProvider } from '../../providers/rota-servico/rota-servico';
import { Geolocation } from '@ionic-native/geolocation';
import {HomePage} from '../home/home';

declare var google;

@IonicPage()
@Component({
  selector: 'page-selecionar-rota',
  templateUrl: 'selecionar-rota.html',
})
export class SelecionarRotaPage {

  latitudeDest:any;
  longitudeDest: any;
  rotas:any;
  request:any;
  dto:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rotaServico: RotaServicoProvider, public geolocation: Geolocation) {
    this.latitudeDest = this.navParams.get("latitude");
    this.longitudeDest = this.navParams.get("longitude");
    console.log("INFO - latitude e longitude são: " + this.latitudeDest + ", " + this.longitudeDest);
    this.carregarRotas();
  }

  carregarRotas(){
    this.geolocation.getCurrentPosition().then((position) => {
        console.log('[INFO] posição atual: ' + position.coords.latitude + "," + position.coords.longitude);
      this.rotaServico.carregarRotas(position.coords.latitude, position.coords.longitude, this.latitudeDest, this.longitudeDest)
      .subscribe(
        data => {
          this.request = data;
          this.dto = this.request;
          if (this.request.status == 'OK'){

             this.rotas = data.routes;

          } else if (this.request.status == 'NOT_FOUND'){

            alert("Ops! Aconteceu um erro, tente novamente mais tarde.")
            console.log("Alguma localização informada não foi geocodificada. Status: NOT_FOUND");

          } else if(this.request.status == 'ZERO_RESULTS'){

            alert("Ops! Aconteceu um erro, tente novamente mais tarde.")
            console.log("Não foi possível encontrar rotas. Status: ZERO_RESULTS");

          } else if(this.request.status == 'MAX_WAYPOINTS_EXCEEDED'){

            alert("Ops! Aconteceu um erro, tente novamente mais tarde.")
            console.log("Muitos waypoints. Status: MAX_WAYPOINTS_EXCEEDED");

          } else if (this.request.status == 'INVALID_REQUEST'){

            alert("Ops! Aconteceu um erro, tente novamente mais tarde.")
            console.log("Solicitação sem origem ou destino. Status: INVALID_REQUEST");

          } else if (this.request.status == 'OVER_QUERY_LIMIT'){

            alert("Ops! Aconteceu um erro, tente novamente mais tarde.")
            console.log("Excedeu limite de requisições. Status: OVER_QUERY_LIMIT");

          } else if (this.request.status == 'REQUEST_DENIED'){

            alert("Ops! Aconteceu um erro, tente novamente mais tarde.")
            console.log("Não há permissão para uso de Directions. Status: REQUEST_DENIED");

          } else if (this.request.status == 'UNKNOWN_ERROR'){

            alert("Ops! Aconteceu um erro, tente novamente mais tarde.")
            console.log("Não foi possível processar a rota. Status: UNKNOWN_ERROR");

          }
         
          console.log("INFO - sucesso ao carregar rotas" + data );          
        },
        err => {
          alert("Erro ao carregar rotas. Tente novamente.")
          console.log('[ERRO] ao carregar rotas no serviço' + err);
        },
        ()=> console.log("serviço finalizado")
      );

      }, (err) =>{
      console.log('[ERRO] ao carregar localização' + err);
    });

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelecionarRotaPage');
  }

  selecionarRota(rota){
    this.dto.routes.length = 0;
    console.log('INFO: Ojeto dto sem rotas ' + JSON.stringify(this.dto));
    delete rota.regioes_perigosas;
    console.log('INFO: rota sem regioes perigosas ' + JSON.stringify(rota));
    this.dto.routes.push(rota);
    //delete newRequest.routes.regioes_perigosas;
    //for(var i=0; i<this.dto.routes.l)

    console.log('INFO - rota selecionada com sucesso ' + JSON.stringify(this.dto));

    this.navCtrl.setRoot(HomePage, {requisicaoRota: this.dto});
  }

}
