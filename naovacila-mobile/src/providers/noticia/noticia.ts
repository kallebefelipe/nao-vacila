import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


let apiNoticiaUrl = "http://naovacila.azurewebsites.net/api/noticia";

@Injectable()
export class NoticiaProvider {

  constructor(public http: Http) {
    console.log('Hello NoticiaProvider Provider');
  }

  carregarNoticias(){
    return this.http.get(apiNoticiaUrl)
      .map(res=>res.json())
      .catch(res=>{return Observable.throw(res)});
  }

}
