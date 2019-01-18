import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { User, UserDetails, Auth } from '@ionic/cloud-angular';
import { Auth2 } from '../../providers/auth2';
import { SignupPage } from '../signup/signup';
import { MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signupwelcome',
  templateUrl: 'signupwelcome.html',
})
export class SignupwelcomePage {

  firstname: '';
  lastname: '';
  email: '';
  role: 'reader';
  
  /*constructor(public navCtrl: NavController, public navParams: NavParams, public user: User, public menu:MenuController, public loadingCtrl: LoadingController, public auth: Auth) {
  }*/
  constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController, public menu:MenuController, public navParams: NavParams, public user:User) {
 
  }

  ionViewDidLoad() {
    this.menu.enable(false);
    this.menu.swipeEnable(false, 'menu');
  }

  ionViewDidLeave(){
    this.menu.enable(true);
  }

  continue() {
    this.user.details.name = this.firstname + " " + this.lastname;
    this.user.details.email = this.email;
    this.user.data.set("firstname", this.firstname);
    this.user.data.set("lastname", this.lastname);
    this.navCtrl.push(SignupPage, {firstname: this.firstname, lastname: this.lastname, email: this.email, role: this.role});
  }

}
