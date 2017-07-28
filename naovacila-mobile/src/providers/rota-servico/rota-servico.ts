import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

let apiRotaUrl = "https://webserver-nao-vacila.herokuapp.com/gerar_rota/";

@Injectable()
export class RotaServicoProvider {

  constructor(public http: Http) {
    console.log('Hello RotaServicoProvider Provider');
  }

  carregarRotas(latOrig, longOrig, latDest, longDest){
    var url = apiRotaUrl+"?latitude_origem="+latOrig+"&longitude_origem="+longOrig+"&latitude_destino="+latDest+"&longitude_destino="+longDest;
    return this.http.get(url)
      .map(res=>res.json())
      .catch(res=>{return Observable.throw(res)});
  }

}
