import { Injectable } from '@angular/core';
import { ConnectionService } from './../connection/connection.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private ConnectionService: ConnectionService
  ) { }

  decodeToken(token: any) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }


  getUserData() {
    let token = localStorage.getItem('token')
    const { userId } = this.decodeToken(token)
    return this.ConnectionService.userData(userId)
  }
}
