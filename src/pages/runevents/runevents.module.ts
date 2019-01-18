import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RuneventsPage } from './runevents';

@NgModule({
  declarations: [
    RuneventsPage,
  ],
  imports: [
    IonicPageModule.forChild(RuneventsPage),
  ],
  exports: [
    RuneventsPage
  ]
})
export class RuneventsModule {}
