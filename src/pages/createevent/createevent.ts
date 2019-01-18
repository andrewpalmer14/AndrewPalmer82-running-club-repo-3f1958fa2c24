import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { Events } from '../../providers/events';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-createevent',
  templateUrl: 'createevent.html',
})
export class CreateeventPage {

  loading: any;
  myEvents: any;

  title: '';
  icon: '';
  date: '';
  time: '';
  location: '';
  description: '';
  code: '';
  completed: false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController, public events:Events, public loadingCtrl:LoadingController, public menu: MenuController) {
  }

  ionViewDidLoad() {
    this.menu.enable(false);
    this.menu.swipeEnable(false);
    console.log('ionViewDidLoad Createevent');
  }

  regexDate(date:string) {
    return date.split("-");
  }

  regexTime(time:string) {
    return time.split(":");
  }

  hourIsPm(hour:String) {
    if (Number(hour) == 24) {
      return false;
    } else {
      return Number(hour) >= 12
    }
  }

  calculateHour(hour:String) {
    if (Number(hour) == 0) {
      return 12;
    }
    if (Number(hour) > 12) {
      return Number(hour) - 12;
    } else {
      return Number(hour);
    }
  }

  create() {
    var dateFormat:Array<String> = this.regexDate(this.date);
    var newDateFormat:string = dateFormat[1] + "/" + dateFormat[2] + "/" + dateFormat [0];
    var timeFormat:Array<String> = this.regexTime(this.time);
    var newTimeFormat:string = " at " + this.calculateHour(timeFormat[0]) + ":" + timeFormat[1] + " ";
    if (this.hourIsPm(timeFormat[0])) {
      newTimeFormat += "PM"
    } else {
      newTimeFormat += "AM"
    }
    var event = {
      title: this.title,
      icon: this.icon,
      date: newDateFormat + newTimeFormat,
      location: this.location,
      description: this.description,
      code: this.code,
      completed: this.completed
    }
    console.log(event.date);
    if(event){
      this.showLoader();
      this.events.createEvent(event).then((result) => {
        this.loading.dismiss();
        this.myEvents = result;
        alert("Event Created!");
        this.navCtrl.setRoot(HomePage);
      }, (err) => {
        this.loading.dismiss();
        alert("Error, could not create event.");
        console.log("not allowed");
      });
    }
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Creating Event...'
    });
    this.loading.present();
  }

  goBack() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure you want to leave?',
      message: 'This event has not been saved.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    alert.present();
  }

}
