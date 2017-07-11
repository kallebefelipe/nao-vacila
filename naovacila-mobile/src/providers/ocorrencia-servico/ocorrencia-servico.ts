import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


let apiOcorrenciaUrl = "https://webserver-nao-vacila.herokuapp.com/ocorrencia/?format=json";

@Injectable()
export class OcorrenciaServicoProvider {
data: any;

  constructor(public http: Http) {
    console.log('Hello OcorrenciaServicoProvider Provider');
  }

  carregarOcorrencias(){
    return this.http.get(apiOcorrenciaUrl)
      .map(res=>res.json())
      .catch(res=>{return Observable.throw(res)});
  }

}
