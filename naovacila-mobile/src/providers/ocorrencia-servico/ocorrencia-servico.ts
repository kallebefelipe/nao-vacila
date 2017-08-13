import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


let apiOcorrenciaUrl = "https://webserver-nao-vacila.herokuapp.com/ocorrencia/?format=json";
let apiSalvarOcorrenciaUrl = "https://webserver-nao-vacila.herokuapp.com/ocorrencia/";
let apiOcorrenciaUsuarioUrl = "https://webserver-nao-vacila.herokuapp.com/ocorrencia/?id_usuario=";

@Injectable()
export class OcorrenciaServicoProvider {
  data: any;

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello OcorrenciaServicoProvider Provider');
  }

  carregarOcorrencias() {
    return this.http.get(apiOcorrenciaUrl)
      .map(res => res.json())
      .catch(res => { return Observable.throw(res) });
  }

  salvarOcorrencia(id_tipo, descricao, latitude, titulo, data, endereco, longitude, id_usuario, hora) {
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

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log(ocorrencia);
    console.log(descricao);

    return this.http.post(apiSalvarOcorrenciaUrl, ocorrencia, options)
      .map(res => { res });

  }

  carregarOcorrenciasUsuario(id_usuario) {
    
        var url = apiOcorrenciaUsuarioUrl + id_usuario;
        return this.http.get(url)
          .map(res => res.json())
          .catch(res => { return Observable.throw(res) });
  }

}
