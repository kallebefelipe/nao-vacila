import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroRadarPage } from './registro-radar';

@NgModule({
  declarations: [
    RegistroRadarPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroRadarPage),
  ],
  exports: [
    RegistroRadarPage
  ]
})
export class RegistroRadarPageModule {}
