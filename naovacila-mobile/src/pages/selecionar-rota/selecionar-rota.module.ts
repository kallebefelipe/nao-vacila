import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelecionarRotaPage } from './selecionar-rota';

@NgModule({
  declarations: [
    SelecionarRotaPage,
  ],
  imports: [
    IonicPageModule.forChild(SelecionarRotaPage),
  ],
  exports: [
    SelecionarRotaPage
  ]
})
export class SelecionarRotaPageModule {}
