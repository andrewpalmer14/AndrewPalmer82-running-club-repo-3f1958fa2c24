import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { User, UserDetails, Auth } from '@ionic/cloud-angular';
import { Auth2 } from '../../providers/auth2';

import { WelcomePage } from '../welcome/welcome';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  firstname: '';
  lastname: '';
  gender: '';
  type: '';
  size: '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: Auth, public auth2: Auth2, public menu: MenuController, public alertCtrl: AlertController, public user: User) {
  }

  ionViewDidLoad() {
    this.firstname = this.user.data.get("firstname");
    this.lastname = this.user.data.get("lastname");
    this.gender = this.user.data.get("gender");
    this.type = this.user.data.get("type");
    this.size = this.user.data.get("size");
    this.menu.enable(true);
    this.menu.swipeEnable(true);
  }
  ionViewDidLeave(){
    this.menu.enable(true);
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm settings',
      message: 'Do you want to save your changes?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: () => {
            console.log('Save clicked');
            this.user.details.name = this.firstname + " " + this.lastname;
            this.user.data.set("firstname", this.firstname);
            this.user.data.set("lastname", this.lastname);
            this.user.data.set("type", this.type);
            this.user.data.set("size", this.size);
            this.user.save();
/*
            let credentials = {
              email: this.user.details.email,
              password: this.user.details.password,
              firstname: this.user.data.get("firstname"),
              lastname: this.user.data.get("lastname"),
              type: this.user.data.get("type"),
              size: this.user.data.get("size"),
              role: this.user.data.get("role")
            }
            this.auth2.updatePreferences(credentials).then((result) => {
              console.log(result);
            }, (err) => {
              console.log(err);
            });*/
          }
        }
      ]
    });
    alert.present();
  }

  /*logout() {
    this.auth.logout();
    this.menu.swipeEnable(false);
    this.navCtrl.setRoot(WelcomePage);
  }*/
  logout(){
    let alert = this.alertCtrl.create({
      title: 'Are you sure you want to log out?',
      message: 'You will have to enter your email and password the next time you use this app.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.auth.logout();
            this.auth2.logout();
            this.navCtrl.setRoot(WelcomePage);
          }
        }
      ]
    });
    alert.present();
  }

}
