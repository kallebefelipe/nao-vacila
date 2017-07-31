import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { RotaServicoProvider } from '../../providers/rota-servico/rota-servico';
import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from '../home/home';


declare var google;

@IonicPage()
@Component({
  selector: 'page-selecionar-rota',
  templateUrl: 'selecionar-rota.html',
})
export class SelecionarRotaPage {

  latitudeDest: any;
  longitudeDest: any;
  rotas: any;
  dto:any;
  loader:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public rotaServico: RotaServicoProvider, public geolocation: Geolocation, private zone: NgZone,
    public loadingController: LoadingController) {

    this.latitudeDest = this.navParams.get("latitude");
    this.longitudeDest = this.navParams.get("longitude");
    console.log("INFO - latitude e longitude são: " + this.latitudeDest + ", " + this.longitudeDest);
    
  }

  presentLoading(){
    this.loader = this.loadingController.create({
      content: "Calculando rotas"
    });

    this.loader.present();
  }
  
  carregarRotas() {
    this.presentLoading();
    this.geolocation.getCurrentPosition().then((position) => {
      console.log('[INFO] posição atual: ' + position.coords.latitude + "," + position.coords.longitude);

      let latLngOrigem = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let latLngDestino = new google.maps.LatLng(this.latitudeDest, this.longitudeDest);

      var directionsService = new google.maps.DirectionsService();

      var request = {
        origin: latLngOrigem,
        destination: latLngDestino,
        travelMode: 'DRIVING',
        provideRouteAlternatives: true
      };

      directionsService.route(request, this.directionsServiceCallback.bind(this));
      
    }, (err) => {
      console.log('[ERRO] ao carregar localização' + err);
    });


  }

  directionsServiceCallback(response, status){
     
        console.log(JSON.stringify(response));
        this.calcPericulosidade(response);
     
      
     
  }

  calcPericulosidade(response){
    this.dto=response;
    console.log('INFO - calcularPericulosidade');
    this.rotaServico.calcularPericulosidade(response)
    .subscribe(
        data => {
          this.zone.run(()=>{
            this.rotas = data.routes;
            console.log("INFO - Rotas com periculosidade " + JSON.stringify(data) );   
            this.loader.dismiss();
          })
          
        },
        err => {
          alert("Erro ao calcular periculosidade. Tente novamente.")
          console.log('[ERRO] ao calcular periculosidade.' + err);
        },
        ()=>{
          
          console.log("serviço finalizado")
        } 
    );
  }

  ionViewDidLoad() {
    this.carregarRotas();
  }

  selecionarRota(indexRota) {
    console.log('entrou');
    var rota = this.dto.routes[indexRota];
    this.dto.routes.length = 0;
    console.log('INFO: Ojeto dto sem rotas ' + JSON.stringify(this.dto));
    
    this.dto.routes.push(rota);
    //delete newRequest.routes.regioes_perigosas;
    //for(var i=0; i<this.dto.routes.l)

    console.log('INFO - rota selecionada com sucesso ' + JSON.stringify(this.dto));

    this.navCtrl.setRoot(HomePage, { requisicaoRota: this.dto });
  }

}


