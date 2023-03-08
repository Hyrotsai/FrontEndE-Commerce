import { UserService } from './../../../service/user/user.service';
import { ConnectionService } from 'src/app/service/connection/connection.service';
import { Component, OnInit } from '@angular/core';
import { ComunicationService } from './../../../service/comunication/comunication.service';
import { CartService } from './../../../service/cart/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(
    private ComunicationService: ComunicationService,
    private CartService: CartService,
    private ConnectionService: ConnectionService,
    private UserService: UserService
  ) { }

  cart: any
  total: any = 0
  user: any
  success: Boolean = false
  enableRedeem: Boolean = false

  ngOnInit(): void {
    this.cart = this.CartService.getInfoCart()
    this.UserService.getUserData().subscribe(data => this.user = data)
    this.getTotalPrices()
  }

  getTotalPrices() {
    this.total = 0
    if (this.cart.length == 0) this.enableRedeem = false
    if (this.cart.length >= 1) this.enableRedeem = true
    this.cart.forEach((data: any) => {
      this.total += data.quantity * data.product.price
    })
  }

  cleanCart() {
    this.cart = []
    localStorage.removeItem('cart')
    this.ComunicationService.cleanCart()
    this.getTotalPrices()
  }

  deleteItem(index: any) {
    this.cart.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(this.cart))
    this.ComunicationService.enviarProductos(this.cart)
    this.getTotalPrices()
  }

  sendCart() {
    let data = this.prepareData(this.user, this.cart)
    this.ConnectionService.createOrder(data).subscribe(data => {
      this.success = true
      this.cleanMessage()
      return data
    })
    this.cleanCart()
  }

  prepareData(user: any, cart: any) {
    let data = {
      orderItems: cart,
      shippingAddress1: user.apartment,
      shippingAddress2: user.street,
      city: user.city,
      zip: user.zip,
      country: user.country,
      phone: user.phone,
      status: "Pending",
      user: user.id,
    }
    return data
  }

  cleanMessage() {
    setTimeout(() => {
      this.success = false
    }, 4000);
  }

}
