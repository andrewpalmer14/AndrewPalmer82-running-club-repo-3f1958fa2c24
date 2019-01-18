import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage'

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SignupwelcomePage } from '../pages/signupwelcome/signupwelcome';
import { ListPage } from '../pages/list/list';
import { SettingsPage } from '../pages/settings/settings';
import { RuneventsPage } from '../pages/runevents/runevents';
import { CheckinPage } from '../pages/checkin/checkin';
import { CreateeventPage } from '../pages/createevent/createevent';
import { ClaimPage } from '../pages/claim/claim';

import { Auth2 } from '../providers/auth2';
import { Events } from '../providers/events';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'ae39df56'
  }
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    WelcomePage,
    LoginPage,
    SignupPage,
    SignupwelcomePage,
    ListPage,
    SettingsPage,
    RuneventsPage,
    CheckinPage,
    CreateeventPage,
    ClaimPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    WelcomePage,
    LoginPage,
    SignupPage,
    SignupwelcomePage,
    ListPage,
    SettingsPage,
    RuneventsPage,
    CheckinPage,
    CreateeventPage,
    ClaimPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Auth2,
    Events,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
