import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public userChangedEvent: any;
  public nameChanged: any;

  constructor(private http: HttpClient) {
    this.nameChanged = new Observable((observer) => {
       this.userChangedEvent = observer;
       return {unsubscribe() { }}
    });
  }
  
  userChanged(user){
  	this.userChangedEvent.next(user);
  }

  getUser(){
    if(!localStorage.getItem('user')){
      return false;
    } else {
      return JSON.parse(localStorage.getItem('user'));
    }
  }

  setUser(user){
    this.userChangedEvent.next(user);
    return localStorage.setItem('user', JSON.stringify(user));
  }

  removeUser(){
    this.userChangedEvent.next('');
    return localStorage.setItem('user', '');
  }
}