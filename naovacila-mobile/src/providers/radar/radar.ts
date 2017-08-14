import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

let apiRadarUrl = "https://webserver-nao-vacila.herokuapp.com/alertas/";
let apiRadarUsuarioUrl = "https://webserver-nao-vacila.herokuapp.com/alertas/?id_usuario=";
@Injectable()
export class RadarProvider {

  constructor(public http: Http) {
    console.log('Hello RadarProvider Provider');


  }

  salvarRadar(id_usuario, latitude, raio, longitude, endereco, titulo, token){
    let radar = JSON.stringify({
      id_usuario: id_usuario,
      latitude: latitude,
      raio: raio,
      longitude: longitude,
      endereco: endereco,
      titulo: titulo,
      token: token
    })

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(apiRadarUrl, radar, options)
      .map(res=>{res});
  }

  carregarRadaresUsuario(id_usuario) {
    
        var url = apiRadarUsuarioUrl + id_usuario;
        return this.http.get(url)
          .map(res => res.json())
          .catch(res => { return Observable.throw(res) });
  }

}
