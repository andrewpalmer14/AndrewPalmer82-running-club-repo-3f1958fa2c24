import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { User, UserDetails, IDetailedError, Auth } from '@ionic/cloud-angular';
import { Auth2 } from '../../providers/auth2';
import { MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  loading: any;
  password: '';
  type: '';
  size: '';
  firstname: '';
  lastname: '';
  email: '';
  role: '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: Auth, public auth2:Auth2, public user: User, private loadingCtrl: LoadingController, public menu:MenuController) {
    this.firstname = this.user.data.get("firstname");
    this.lastname = this.user.data.get("lastname");
    this.email = this.navParams.get("email");
    this.role = this.navParams.get("role");
  }
  /*role: string;
  email: string;
  firstname: string;
  lastname: string;
  type: string;
  size: string;
  password: string;
  loading: any;*/
/*
  constructor(public navCtrl: NavController, public auth: Auth, public loadingCtrl: LoadingController, public menu:MenuController, public navParams: NavParams) {
    this.firstname = navParams.get("firstname");
    this.lastname = navParams.get("lastname");
    this.email = navParams.get("email");
    //navParams.get("firstname");
  }*/

  ionViewDidLoad() {
    this.menu.enable(false);
    this.menu.swipeEnable(false);
  }
  
  ionViewDidLeave(){
    this.menu.enable(true);
  }

  /*showLoader(){
    this.loading = this.loadingCtrl.create({
      content: "Authenticating..."
    });
 
    this.loading.present();
  }*/

  register(){
    //this.showLoader();
    let details = {
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password,
        type: this.type,
        size: this.size,
        role: this.role
    };
 
    this.auth2.createAccount(details).then((result) => {
      //this.loading.dismiss();
      this.login2();
    }, (err) => {
        this.loading.dismiss();
    });
 
  }

  login2(){
    //this.showLoader();
    let credentials = {
        email: this.email,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
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

  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
 
    this.loading.present();
 
  }

  signupEmail(password){
    this.showLoader();
        let details: UserDetails = {
            'email': this.user.details.email, 
            'password': this.password,
            'name': this.user.details.name,
        };
    
        this.auth.signup(details).then(() => {
            //this.loading.dismiss();
            // success
            //this.register();
            return this.login(this.user.details.email, password);
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

    login(email, password){
    
    //this.showLoader();
    let details: UserDetails = {
        'email': email,
        'password': password
    };
    this.auth.login('basic', details).then(() => {
        //this.loading.dismiss();
        // success
        this.user.data.set("firstname", this.firstname);
        this.user.data.set("lastname", this.lastname);
        this.user.data.set("size", this.size);
        this.user.data.set("type", this.type);
        this.user.data.set("number", 0);
        this.user.data.set("role", "reader");
        this.user.save();
        //this.navCtrl.setRoot(HomePage);
        //this.login2();
        this.register();
 
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

}
