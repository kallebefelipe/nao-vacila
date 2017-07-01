import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TipoOcorrenciaPage } from './tipo-ocorrencia';

@NgModule({
  declarations: [
    TipoOcorrenciaPage,
  ],
  imports: [
    IonicPageModule.forChild(TipoOcorrenciaPage),
  ],
  exports: [
    TipoOcorrenciaPage
  ]
})
export class TipoOcorrenciaPageModule {}
