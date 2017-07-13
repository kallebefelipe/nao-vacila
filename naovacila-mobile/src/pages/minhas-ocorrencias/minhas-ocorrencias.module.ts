import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinhasOcorrenciasPage } from './minhas-ocorrencias';

@NgModule({
  declarations: [
    MinhasOcorrenciasPage,
  ],
  imports: [
    IonicPageModule.forChild(MinhasOcorrenciasPage),
  ],
  exports: [
    MinhasOcorrenciasPage
  ]
})
export class MinhasOcorrenciasPageModule {}
