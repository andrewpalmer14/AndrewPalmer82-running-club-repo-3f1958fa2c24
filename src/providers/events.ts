import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth2 } from './auth2';
import 'rxjs/add/operator/map';

@Injectable()
export class Events {

  constructor(public http: Http, public auth: Auth2) {
  }

  getEvents() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.auth.token);
      this.http.get('https://running-club.herokuapp.com/api/events', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
    //console.log("http get request method 1: " + JSON.stringify(this.http.get('https://running-club.herokuapp.com/api.events')));
    //console.log("http get request method 2: " + new Promise((resolve, reject) => { this.http.get('https://running-club.herokuapp.com/api.events').map(res=>res.json()).subscribe(data=>{resolve(data);}, (err)=>{reject(err);});}));
    //return this.http.get(JSON.stringify('https://running-club.herokuapp.com/api.events'));
   // return new Promise((resolve, reject) => { this.http.get('https://running-club.herokuapp.com/api.events').map(res=>res.json()).subscribe(data=>{resolve(data);}, (err)=>{reject(err);});});
  }

  createEvent(event) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.auth.token);
      this.http.post('https://running-club.herokuapp.com/api/events', JSON.stringify(event), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteEvent(id) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Authorization', this.auth.token);
        this.http.delete('https://running-club.herokuapp.com/api/events/' + id, {headers: headers}).subscribe((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });    
    });
  }

}
