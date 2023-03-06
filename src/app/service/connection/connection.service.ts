import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(
    private httpClient: HttpClient
  ) { }

  decodeToken(token: any) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  loginUser(data: any) {
    return this.httpClient.post(`${environment.server}users/login`, data)
  }

  registerUser(data: any) {
    return this.httpClient.post(`${environment.server}users/register`, data)
  }

  userData(userId: any) {
    const auth_token = localStorage.getItem('token')
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })
    }
    return this.httpClient.get(`${environment.server}users/${userId}`, headers)
  }

  modifyUser(body: any) {
    const auth_token = localStorage.getItem('token')
    const { userId } = this.decodeToken(auth_token)
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })
    }
    return this.httpClient.put(`${environment.server}users/${userId}`, body, headers)
  }

  getProduct() {
    return this.httpClient.get(`${environment.server}products`)
  }

  createProduct(data: any) {
    return this.httpClient.post(`${environment.server}products`, data)
  }

  createOrder(data: any) {
    const auth_token = localStorage.getItem('token')
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })
    }
    return this.httpClient.post(`${environment.server}orders`, data, headers)
  }

  getUserOrders(userId: any) {
    const auth_token = localStorage.getItem('token')
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })
    }
    return this.httpClient.get(`${environment.server}orders/get/userorders/${userId}`, headers)
  }

  getTotalOrders() {
    const auth_token = localStorage.getItem('token')
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })
    }
    return this.httpClient.get(`${environment.server}orders/get/count`, headers)
  }

  getOrderById(id: any) {
    const auth_token = localStorage.getItem('token')
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })
    }
    return this.httpClient.get(`${environment.server}orders/${id}`, headers)
  }

}