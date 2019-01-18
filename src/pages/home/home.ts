import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController, AlertController, Platform } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { Auth2 } from '../../providers/auth2';
import { User, UserDetails, IDetailedError, Auth } from '@ionic/cloud-angular';
import { Events } from '../../providers/events';
import { CreateeventPage } from '../createevent/createevent';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import { ClaimPage } from '../claim/claim';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  name: any;
  data: '';
  number: 0;
  isAdmin: Boolean;
  myCompletedEvents: any;
  myClaimedEvents: any;

  public token: any;

  //completedEvents: Array<{title: string, icon: string, id: string, date: string, location: string, description: string }>; 
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: Auth, public auth2: Auth2, private loadingCtrl: LoadingController, public menuCtrl: MenuController, public alertCtrl: AlertController, public events: Events, public storage:Storage, public http: Http, public user: User, public iab: InAppBrowser, public platform: Platform) {
    this.name = this.user.data.get("firstname");
    this.number = this.user.data.get("number");
    this.myCompletedEvents = this.user.data.get("myCompletedEvents");
    this.myClaimedEvents = this.user.data.get("myClaimedEvents");

   // this.completedEvents = this.events.getEvents();
   /*this.events.getEvents().then((data) => {
     this.completedEvents = data;
   }, (err) => {
      console.log("not allowed???");
   });*/
    //this.name = this.auth.user.firstname;
    /*exports.login = function(req, res, next){
 
    var userInfo = setUserInfo(req.user);
 
    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
 
}*/ 
  }

  ionViewDidLeave(){
    this.menuCtrl.enable(true);
  }

  ionViewDidLoad() {
    this.isAdmin = this.user.data.get("role") != "reader";
    //this.name = this.auth.user.firstname;  
    //console.log(this.auth.user);
    //console.log(this.auth.user._id);     
   /* this.events.getEvents().then((data) => {
          this.completedEvents = data;
    }, (err) => {
        console.log("not allowed");
    });*/

    //this.completedEvents = this.events.getEvents();
    this.menuCtrl.enable(true);
    this.menuCtrl.swipeEnable(true);

    document.getElementById("claim").removeAttribute("disabled");
    this.number = this.user.data.get("number");
    if (this.number >= 10 && document.getElementById("claim").hasAttribute("disabled")) {
      document.getElementById("claim").removeAttribute("disabled");
    } else {
      document.getElementById("claim").setAttribute("disabled", "true");
    }
  }

  addEvent(){
    this.navCtrl.setRoot(CreateeventPage);
  }
 
  /*deleteEvent(event){
    this.showLoader();
    //Remove from database
    this.events.deleteEvent(event._id).then((result) => {
      this.loading.dismiss();
      //Remove locally
        let index = this.completedEvents.indexOf(event);
        if(index > -1){
            this.completedEvents.splice(index, 1);
        }   
    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }*/

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    this.loading.present();
  }

  openMenu() {
   this.menuCtrl.open();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  claim() {
    if (this.number < 10) {
      let alert = this.alertCtrl.create({
      title: 'Error',
      message: 'Unable to claim T-shirt at this time.',
      buttons: [
        {
          text: 'Close',
          handler: () => {
            
          }
        }
      ]
    });
    alert.present();
    return;
    }
    let alert = this.alertCtrl.create({
      title: 'Claim T-shirt',
      message: 'Are you sure you want to claim your T-shirt? This action cannot be undone.',
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
            this.navCtrl.push(ClaimPage);
            console.log("Previous number: " + this.number);
            this.number -= 10;
            if (this.number >= 10) {
              document.getElementById("claim").removeAttribute("disabled");
            } else {
              document.getElementById("claim").setAttribute("disabled", "true")
            }
            console.log("Current number: " + this.number);
            this.platform.ready().then(() => {
              const browser = this.iab.create('https://teespring.com/runclubtee1#pid=2&cid=2122&sid=front', '_system');
            });
          }
        }
      ]
    });
    alert.present();
  }

  completeEvent(event:any, id:string) {
    //console.log("event.id in function: " + id);
    //document.getElementById(id).setAttribute("disabled", "true");
    //document.getElementById(id).innerHTML = "Run Completed!";
    if (this.myClaimedEvents == null || this.myClaimedEvents == undefined || this.myClaimedEvents.length == 0) {
      this.myClaimedEvents = [];
    }
    this.myClaimedEvents.push(event);
    // change myCompletedEvents to no longer contain claimed events.
    for (var i = 0; i < this.myCompletedEvents.length; i++) {
              if (this.myCompletedEvents[i].id == id) {
                var newArray = [];
                if (i == 0) {
                  newArray = this.myCompletedEvents.slice(1, this.myCompletedEvents.length);
                  this.user.data.set("myCompletedEvents", newArray);
                  this.user.save();
                } else {
                  var array1 = [];
                  var array2 = [];
                  array1 = this.myCompletedEvents.slice(0, i);
                  array2 = this.myCompletedEvents.slice(i+1, this.myCompletedEvents.length);
                  array1.concat(array2);
                  this.user.data.set("myCompletedEvents", array1);
                  this.user.save();
                }
              }
    }
    this.user.data.set("myClaimedEvents", this.myClaimedEvents);
    this.number++;
    this.user.data.set("number", this.number);
    this.user.save();
    if (this.number >= 10) {
      document.getElementById("claim").removeAttribute("disabled");
    } else {
      document.getElementById("claim").setAttribute("disabled", "true")
    }
    this.navCtrl.setRoot(HomePage);
  }


}
