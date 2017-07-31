import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

let apiRotaUrl = "https://webserver-nao-vacila.herokuapp.com/gerar_rota/";
let apiCalculoPericulosidadeUrl = "https://webserver-nao-vacila.herokuapp.com/calcular_periculosidade/";

@Injectable()
export class RotaServicoProvider {
  historicoRota =[];

  constructor(public http: Http, private nativeStorage: Storage) {
    console.log('Hello RotaServicoProvider Provider');
  }

  carregarRotas(latOrig, longOrig, latDest, longDest){
    var url = apiRotaUrl+"?latitude_origem="+latOrig+"&longitude_origem="+longOrig+"&latitude_destino="+latDest+"&longitude_destino="+longDest;
    return this.http.get(url)
      .map(res=>res.json())
      .catch(res=>{return Observable.throw(res)});
  }

  calcularPericulosidade(rotas){
    let body = JSON.stringify(rotas);
    console.log('INFO serviço ' + body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(apiCalculoPericulosidadeUrl,body, options)
      .map(res=>res.json());      
  }

  carregarHistoricoRotas(){
    return this.nativeStorage.get('historicoRota');
  }

  salvarRotaNoHistorico(local){
    console.log('INFO - entrou no servico Salvar Rota no Historico');
    return this.nativeStorage.get('historicoRota')
    .then((data) => {
      if(data != null){
        console.log('INFO - lista de historico atual' + data);
        this.historicoRota = JSON.parse(data);
        this.historicoRota.push(local);
      }
      else{
        this.historicoRota.push(local);
      }
      this.nativeStorage.set('historicoRota', JSON.stringify(this.historicoRota));
    }, (err)=>{
      console.log(err);
    })
  }

}
