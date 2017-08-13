import { Component } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus';
// import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { UsuarioProvider } from '../../providers/usuario/usuario';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  FB_APP_ID: number = 350485625371107;
  token: any;
  loader: any;

  constructor(public navCtrl: NavController, public fb: Facebook,
    public loadingCtrl: LoadingController, public googlePlus: GooglePlus,
    public nativeStorage: Storage, public usuarioServico: UsuarioProvider) {
    //Facebook.browserInit(this.FB_APP_ID, "v2.8");
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  doFbLogin() {
    let permissions = new Array<string>();
    let nav = this.navCtrl;
    let env = this;

    permissions = ["public_profile", "email"];

    this.fb.login(permissions)
      .then(function (response) {
        console.log('entrou no login');
        let userId = response.authResponse.userID;
        let params = new Array<string>();

        env.fb.api("/me?fields=name,gender, email", params)
          .then(function (user) {
            env.presentLoading();
            console.log('INFO dados fb ' + JSON.stringify(user));
            user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";

            env.nativeStorage.get('token')
              .then((data) => {
                console.log('INFO - token recuperado ' + data);
                
                env.usuarioServico.salvarUsuario(data, user.email, user.gender, user.name, user.picture, userId)
                  .subscribe(
                  data => {

                    console.log('INFO - sucesso ao salvar usuario ' + JSON.stringify(data))
                    let usuario = {
                      name: user.name,
                      gender: user.gender,
                      picture: user.picture,
                      id: 1
                    };
                    env.nativeStorage.set('user', JSON.stringify(usuario));
                    env.loader.dismiss();
                    nav.setRoot(TabsPage);
                  },
                  err => {
                    console.log('Erro ao salvar usuario' + err);
                  },
                  () => console.log("servico finalizado")
                  );
              })


          })
      }, function (error) {
        console.log('erro no login' + error);
      });
  }

  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Entrando..."
    });

    this.loader.present();

  }

  // doGoogleLogin(){
  //   let nav = this.navCtrl;
  //   let env = this;
  //   let loading = this.loadingCtrl.create({
  //     content: 'Aguarde...'
  //   });
  //   loading.present();
  //   this.googlePlus.login({
  //     'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
  //     'webClientId': '550281591965-pr7s1c3ndpcv7pg0clebuape5k3ejs7t.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
  //     'offline': true
  //   })
  //   .then(function (user) {
  //     loading.dismiss();

  //     env.nativeStorage.setItem('user', {
  //       name: user.displayName,
  //       email: user.email,
  //       picture: user.imageUrl
  //     })
  //     .then(function(){
  //       nav.setRoot(TabsPage);
  //     }, function (error) {
  //       console.log(error);
  //     })
  //   }, function (error) {
  //     loading.dismiss();
  //   });
  // }

}
