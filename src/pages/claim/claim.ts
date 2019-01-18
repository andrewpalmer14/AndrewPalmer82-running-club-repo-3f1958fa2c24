import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { User, UserDetails, IDetailedError, Auth } from '@ionic/cloud-angular';
import { HomePage } from '../home/home';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-claim',
  templateUrl: 'claim.html',
})
export class ClaimPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public user:User, public menu: MenuController, private iab: InAppBrowser, public platform: Platform) {
    //window.open('https://teespring.com/runclubtee1#pid=2&cid=2122&sid=front', '_blank', 'location=yes');
    //const browser = this.iab.create('https://teespring.com/runclubtee1#pid=2&cid=2122&sid=front', '_system', );
    this.platform.ready().then(() => {
       const browser = this.iab.create('https://teespring.com/runclubtee1#pid=2&cid=2122&sid=front', '_system', );
    });
  }

  ionViewDidLoad() {
    this.menu.enable(false);
    this.menu.swipeEnable(false);
    console.log('ionViewDidLoad Claim');
  }

  cancel() {
    this.navCtrl.setRoot(HomePage);
  }

  confirm() {
    var number = this.user.data.get("number");
    if (number >= 10) {
      number = number - 10;
    }
    this.user.data.set("number", number);
    this.user.save();
    this.navCtrl.setRoot(HomePage);
  }

}
