import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroOcorrenciaPage } from './registro-ocorrencia';

@NgModule({
  declarations: [
    RegistroOcorrenciaPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroOcorrenciaPage),
  ],
  exports: [
    RegistroOcorrenciaPage
  ]
})
export class RegistroOcorrenciaPageModule {}
