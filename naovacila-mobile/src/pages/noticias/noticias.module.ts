import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticiasPage } from './noticias';

@NgModule({
  declarations: [
    NoticiasPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticiasPage),
  ],
  exports: [
    NoticiasPage
  ]
})
export class NoticiasPageModule {}
