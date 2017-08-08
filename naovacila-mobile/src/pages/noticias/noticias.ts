import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { NoticiaProvider } from '../../providers/noticia/noticia';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@IonicPage()
@Component({
  selector: 'page-noticias',
  templateUrl: 'noticias.html',
})
export class NoticiasPage {

  loader: any;
  public noticias: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public noticiaServico: NoticiaProvider
    , public loadingCtrl: LoadingController, private iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticiasPage');

    this.presentLoading();
    this.noticiaServico.carregarNoticias()
      .subscribe(
      data => {
        this.noticias = data;
        this.loader.dismiss();
      },
      err => {
        console.log('[ERROR] ' + err);
        this.loader.dismiss();
      },
      () => console.log("noticias carregadas")
      );
  }

  abrirUrl(url) {
    console.log('abrir noticia');
    const noticia = this.iab.create(url, "_self", "location=yes");
    noticia.show();
  }

  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Carregando notícias..."
    });

    this.loader.present();

  }

}
