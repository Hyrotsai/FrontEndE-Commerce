import { Injectable } from '@angular/core';
import { ComunicationService } from './../comunication/comunication.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  addCartItems: any = []

  constructor(
    private ComunicationService: ComunicationService
  ) { }

  getInfoCart() {
    this.addCartItems = this.ComunicationService.checkProductos()
    if (this.addCartItems == false) this.addCartItems = JSON.parse(localStorage.getItem('cart')!)
    if (this.addCartItems == null) this.addCartItems = []
    return this.addCartItems
  }
}
