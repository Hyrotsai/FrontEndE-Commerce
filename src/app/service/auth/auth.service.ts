import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn = localStorage.getItem('logged') ? (localStorage.getItem('logged') === 'true') : false;

  login() {
    this.isLoggedIn = true;
    localStorage.setItem('logged', JSON.stringify(this.isLoggedIn))
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.setItem('logged', JSON.stringify(this.isLoggedIn))
  }

  getState() {
    return this.isLoggedIn
  }

}
