import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupwelcomePage } from './signupwelcome';

@NgModule({
  declarations: [
    SignupwelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(SignupwelcomePage),
  ],
  exports: [
    SignupwelcomePage
  ]
})
export class SignupwelcomeModule {}
