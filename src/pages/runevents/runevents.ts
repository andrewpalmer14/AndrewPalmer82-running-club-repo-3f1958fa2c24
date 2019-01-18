import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { Auth, User, UserDetails } from '@ionic/cloud-angular';
import { Events } from '../../providers/events';

@IonicPage()
@Component({
  selector: 'page-runevents',
  templateUrl: 'runevents.html',
})
export class RuneventsPage {

  upcomingEvents: any;
  myUpcomingEvents: any;
  myEvents: any;
  myCompletedEvents: any;
  myClaimedEvents: any;
  loading: any;
  name: '';
  number: any;
  isAdmin: Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl:LoadingController, public menuCtrl: MenuController, public user:User, public events:Events) {
    this.name = this.user.data.get("firstname");
    this.number = this.user.data.get("number");
    this.myEvents = this.user.data.get("myEvents");
    if (this.myEvents == null || this.myEvents == undefined || this.myEvents.length == 0) {
      this.myEvents = [];
    }
    this.myCompletedEvents = this.user.data.get("myCompletedEvents");
    if (this.myCompletedEvents == null || this.myCompletedEvents == undefined || this.myCompletedEvents.length == 0) {
      this.myCompletedEvents = [];
    }
    this.myClaimedEvents = this.user.data.get("myClaimedEvents");
    if (this.myClaimedEvents == null || this.myClaimedEvents == undefined || this.myClaimedEvents.length == 0) {
      this.myClaimedEvents = [];
    }
    this.events.getEvents().then((data) => {
      this.upcomingEvents = data;
      if (this.upcomingEvents == null || this.upcomingEvents == undefined || this.upcomingEvents.length == 0) {
        this.upcomingEvents = [];
      }
      this.myUpcomingEvents = [];
      this.upcomingEvents.forEach(upcomingEvent => {
        if (!this.isDuplicate(upcomingEvent)) {
          this.myUpcomingEvents.push(upcomingEvent);
        }
      });
    }, (err) => {
      console.log("not allowed???");
   });
  }

  isDuplicate(upcomingEvent:any) {
    var duplicate = false;
    this.myEvents.forEach(event => {
        if (event.id == upcomingEvent._id) {
          duplicate = true;
        }
    });
    this.myCompletedEvents.forEach(completeEvent => {
      if (completeEvent.id == upcomingEvent._id) {
        duplicate = true;
      }
    });
    this.myClaimedEvents.forEach(claimedEvent => {
      if (claimedEvent.id == upcomingEvent._id) {
        duplicate = true;
      }
    });
    return duplicate;
  }

  ionViewDidLeave(){
    this.menuCtrl.enable(true);
  }

  ionViewDidLoad() {
    this.isAdmin = this.user.data.get("role") != "reader";
    this.menuCtrl.enable(true);
    this.menuCtrl.swipeEnable(true);
  }

  joinEvent(thistitle:string, thisicon:string, thisid:string, thisdate:string, thislocation:string, thisdescription:string/*, thiscompleted:Boolean*/) {
    document.getElementById(thisid).setAttribute("disabled", "true");
    document.getElementById(thisid).innerHTML = "Event Joined";
    let newEvent = {title: thistitle, icon: thisicon, id: thisid, date: thisdate, location: thislocation, description: thisdescription/*, completed: thiscompleted*/};
    var myEvents:Array<any> = this.user.data.get("myEvents");
    if (myEvents == null || myEvents == undefined || myEvents.length == 0) {
      myEvents = [];
    }
    myEvents.push(newEvent);
    this.user.data.set("myEvents", myEvents);
    this.user.save();
  }

  deleteEvent(event){
    this.showLoader();
    //Remove from database
    this.events.deleteEvent(event._id).then((result) => {
      this.loading.dismiss();
      //Remove locally
        let index = this.upcomingEvents.indexOf(event);
        if(index > -1){
            this.upcomingEvents.splice(index, 1);
        }   
    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    this.loading.present();
  }

}
