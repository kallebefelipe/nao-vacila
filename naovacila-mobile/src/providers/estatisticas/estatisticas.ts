import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


let apiEstatisticasUrl = "https://webserver-nao-vacila.herokuapp.com/estatisticas/";

@Injectable()
export class EstatisticasProvider {

  constructor(public http: Http) {
    console.log('Hello EstatisticasProvider Provider');
  }

  carregarEstatisticas(){
    return this.http.get(apiEstatisticasUrl)
      .map(res=>res.json())
      .catch(res=>{return Observable.throw(res)});
  }

}
