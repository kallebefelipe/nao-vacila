import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


let apiOcorrenciaUrl = "https://webserver-nao-vacila.herokuapp.com/ocorrencia/?format=json";
let apiSalvarOcorrenciaUrl = "https://webserver-nao-vacila.herokuapp.com/ocorrencia/";

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

  salvarOcorrencia(id_tipo, descricao, latitude, titulo, data, endereco, longitude, id_usuario, hora){
    let ocorrencia = JSON.stringify({
      id_tipo: id_tipo,
      descricao: descricao,
      latitude: latitude,
      titulo: titulo,
      data: data,
      endereco: endereco,
      longitude: longitude,
      id_usuario: id_usuario,
      hora: hora
    })
    // body.append('id_tipo', id_tipo); 
    // body.append('descricao', descricao);
    // body.append('latitude', latitude); 
    // body.append('titulo', titulo); 
    // body.append('data', data); 
    // body.append('endereco', endereco); 
    // body.append('longitude', longitude); 
    // body.append('id_usuario', id_usuario); 
    // body.append('hora', hora); 

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log(ocorrencia);
    console.log(descricao);

    return this.http.post(apiSalvarOcorrenciaUrl, ocorrencia, options)
      .map(res=>{res});

  }

}
