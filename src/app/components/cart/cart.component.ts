import { Component, OnInit } from '@angular/core';
import { ComunicationService } from './../../service/comunication/comunication.service';
import { CartService } from './../../service/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private ComunicationService: ComunicationService,
    private CartService: CartService
  ) { }

  cart: any

  ngOnInit(): void {
    this.cart = this.CartService.getInfoCart()
    this.ComunicationService.recibirProductosObservable.subscribe(data => {
      this.cart = data
    })
  }

}
