import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Auth2 } from '../providers/auth2';
import { Auth } from '@ionic/cloud-angular';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SettingsPage } from '../pages/settings/settings';
import { WelcomePage } from '../pages/welcome/welcome';
import { RuneventsPage } from '../pages/runevents/runevents';
import { CheckinPage } from '../pages/checkin/checkin';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {  
  @ViewChild(Nav) nav: Nav;
  rootPage:any = WelcomePage;

  loading: any;

  pages: Array<{title: string, icon: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,  public auth: Auth, public auth2: Auth2, public loadingCtrl: LoadingController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Home', icon: 'home', component: HomePage },
      { title: 'My Events', icon: 'list', component: ListPage },
      { title: 'Upcoming Events', icon: 'calendar', component: RuneventsPage },
      { title: 'Settings', icon: 'settings', component: SettingsPage }
    ];
    this.showLoader();
    if (this.auth.isAuthenticated()) {
        //this.rootPage = HomePage;
        //Check if already authenticated
      this.auth2.checkAuthentication().then((res) => {
        this.loading.dismiss();
        this.nav.setRoot(HomePage);
      }, (err) => {
        this.loading.dismiss();
        this.auth.logout();
        this.rootPage = WelcomePage;
      });
    } else {
        this.rootPage = WelcomePage;
        this.loading.dismiss();
    }

   // this.showLoader();
/*
    //Check if already authenticated
    this.auth.checkAuthentication().then((res) => {
      console.log("Already authorized");
      this.loading.dismiss();
      this.nav.setRoot(HomePage);
    }, (err) => {
      console.log("Not already authorized");
      this.loading.dismiss();
      this.rootPage = WelcomePage;
    });*/
    
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Loading...'
    });
    this.loading.present();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
