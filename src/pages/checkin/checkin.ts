import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { User, UserDetails, IDetailedError, Auth } from '@ionic/cloud-angular';
import { Events } from '../../providers/events';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html',
})
export class CheckinPage {

  id: '';
  myEvents: any;
  event: any;
  upcomingEvents: any;
  //currentEvent: {title: '', icon: '', date: '', location: '', description: '', code: ''};
  code: '';
  accessCode: '';
  myCompletedEvents: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public user: User, public events1: Events) {
    this.id = navParams.get("id");
    this.myEvents = this.user.data.get("myEvents");
    this.myEvents.forEach(event => {
      console.log(this.id == event.id);
      if (event.id == this.id) {
        this.event = event;
      }
    });
    this.events1.getEvents().then((data) => {
      this.upcomingEvents = data;
      this.upcomingEvents.forEach(currentEvent => {
        if (this.id == currentEvent._id) {
          this.accessCode = currentEvent.code;
        }
      });
    }, (err) => {
      console.log("not allowed???");
   });
  }

  ionViewDidLoad() {
    this.menu.enable(true);
    this.menu.swipeEnable(true);
  }

  submit() {
    console.log("Code is correct: " + this.code == this.accessCode);
    if (this.code == this.accessCode) {
      this.myCompletedEvents = this.user.data.get("myCompletedEvents");
      if (this.myCompletedEvents == null || this.myCompletedEvents == undefined || this.myCompletedEvents.length == 0) {
        this.myCompletedEvents = [];
      }
      this.myCompletedEvents.push(this.event);
      console.log(this.event);
      this.user.data.set("myCompletedEvents", this.myCompletedEvents);
      for (var i = 0; i < this.myEvents.length; i++) {
              if (this.myEvents[i].id == this.id) {
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
    }
    this.navCtrl.setRoot(HomePage);
  }

}
