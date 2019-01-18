import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { User, UserDetails, IDetailedError, Auth } from '@ionic/cloud-angular';
import { Auth2 } from '../../providers/auth2';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;
  firstname: string;
  lastname: string;
  gender: string;
  type: string;
  size: string;
  loading: any;
  role: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: Auth, public auth2:Auth2, public user: User, private loadingCtrl: LoadingController, public menu:MenuController) {
  }

  ionViewDidLoad() {
    this.menu.enable(false);
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave(){
    this.menu.enable(true);
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });
    this.loading.present();
  }

  login2(){
    //this.showLoader();
 
    let credentials = {
        email: this.email,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        gender: this.gender,
        type: this.type,
        size: this.size,
        role: this.role
    };
 
    this.auth2.login(credentials).then((result) => {
      this.loading.dismiss();
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      this.loading.dismiss();
      console.log(err);
    });
  }
 
 
  login(email, password){
    this.showLoader();
    let details: UserDetails = {
        'email': email,
        'password': password
    };
    this.auth.login('basic', details).then(() => {
        //this.loading.dismiss();
        this.login2();
        // success
        //this.navCtrl.setRoot(HomePage);
 
    }, (err: IDetailedError<string[]>) => {
            this.loading.dismiss();
    
            // handle errors
            for(let error of err.details){
                if(error === 'required_email'){
                    // email missing
                    alert("Please enter an email");
                } else if(error === 'required_password'){
                    // password missing
                    alert("Please enter a password");
                } else if(error === 'conflict_email'){
                    // email already in use
                    alert("Email is already in use");
                } else if (error === 'conflict_username'){
                    // username alerady in use
                } else if (error === ' invalid_email'){
                    // email not valid
                    alert("Invalid email");
                }
            }
        });
  }

  loginInputChanged() {
    if (this.email != '' && this.password != '') {
      document.getElementById("loginButton").removeAttribute("disabled");
    } else {
      document.getElementById("loginButton").setAttribute("disabled", "true")
    }
  }

}
