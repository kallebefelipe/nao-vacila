import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeusRadaresPage } from './meus-radares';

@NgModule({
  declarations: [
    MeusRadaresPage,
  ],
  imports: [
    IonicPageModule.forChild(MeusRadaresPage),
  ],
  exports: [
    MeusRadaresPage
  ]
})
export class MeusRadaresPageModule {}
