import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarRotaPage } from './criar-rota';

@NgModule({
  declarations: [
    CriarRotaPage,
  ],
  imports: [
    IonicPageModule.forChild(CriarRotaPage),
  ],
  exports: [
    CriarRotaPage
  ]
})
export class CriarRotaPageModule {}
