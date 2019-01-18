import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupwelcomePage } from '../signupwelcome/signupwelcome';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu:MenuController) {
    
  }

  ionViewDidLoad() {
    this.menu.enable(false);
    this.menu.swipeEnable(false, 'menu');
  }
  
  ionViewDidLeave(){
    this.menu.enable(true);
  }

  LogInClicked() {
    this.navCtrl.push(LoginPage);
  }

  SignUpClicked() {
    this.navCtrl.push(SignupwelcomePage);
  }

}
