import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { Auth, User, UserDetails } from '@ionic/cloud-angular';
import { WelcomePage } from '../welcome/welcome';
import { CheckinPage } from '../checkin/checkin';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  myEvents: Array<{title: string, icon: string, id: string, date: string, location: string, description: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public auth: Auth, public menu: MenuController, public user: User) {
  }

  ionViewDidLoad() {
    this.menu.enable(true);
    this.menu.swipeEnable(true);
    this.myEvents = this.user.data.get("myEvents");
  }
  ionViewDidLeave(){
    this.menu.enable(true);
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }

  checkIn(id:string, thisevent:any) {
    //document.getElementById(id).setAttribute("disabled", "true");
    //document.getElementById(id).innerHTML = "Check in Complete!";
    this.navCtrl.push(CheckinPage, {event: thisevent, id: id});
  }

  removeEvent(id:string) {
    let alert = this.alertCtrl.create({
      title: 'Are you sure you want to remove this event from \'My Events\'?',
      message: 'You can find new events in \'Upcoming Events\'.',
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
            for (var i = 0; i < this.myEvents.length; i++) {
              if (this.myEvents[i].id == id) {
                var newArray = [];
                if (i == 0) {
                  newArray = this.myEvents.slice(1, this.myEvents.length);
                  this.user.data.set("myEvents", newArray);
                  this.user.save();
                } else {
                  var array1 = [];
                  var array2 = [];
                  array1 = this.myEvents.slice(0, i);
                  array2 = this.myEvents.slice(i+1, this.myEvents.length);
                  array1.concat(array2);
                  this.user.data.set("myEvents", array1);
                  this.user.save();
                }
              }
            }
            this.navCtrl.setRoot(ListPage);
          }
        }
      ]
    });
    alert.present();
  }

}
