import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstatisticasPage } from './estatisticas';

@NgModule({
  declarations: [
    EstatisticasPage,
  ],
  imports: [
    IonicPageModule.forChild(EstatisticasPage),
  ],
  exports: [
    EstatisticasPage
  ]
})
export class EstatisticasPageModule {}
