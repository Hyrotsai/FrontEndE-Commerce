import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {

  cart: any = []
  option: any
  constructor() { }

  private enviarProductosSubject = new Subject<any>();
  recibirProductosObservable = this.enviarProductosSubject.asObservable()

  enviarProductos(cart: any) {
    this.cart = cart
    this.enviarProductosSubject.next(this.cart)
  }

  checkProductos() {
    return this.cart
  }

  cleanCart() {
    this.cart = []
  }

}