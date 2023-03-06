import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConnectionService } from 'src/app/service/connection/connection.service';
import { ComunicationService } from './../../service/comunication/comunication.service';
import { CartService } from './../../service/cart/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  constructor(
    private ConnectionService: ConnectionService,
    private ComunicationService: ComunicationService,
    private CartService: CartService
  ) { }
  @Output() sendData = new EventEmitter()
  productList: any
  productCount: any = []
  orderItems: any = []
  addCartItems: any = []
  orderCero = false

  ngOnInit(): void {
    this.orderCero = false
    this.addCartItems = this.CartService.getInfoCart()
    if (this.addCartItems == null) this.addCartItems = []
    this.ConnectionService.getProduct().subscribe(data => {
      this.productList = data
      for (let index = 0; index < this.productList.length; index++) {
        this.productCount[index] = 0;
      }
      //INFO envia la informacion a un componente padre
      this.sendData.emit(this.productList)
      //INFO si la llamada da error
    }, ((error: any) => this.orderCero = true))
  }

  productStock(option: any, index: any) {
    if (option == 'restar') {
      if (this.productCount[index] == 0) return
      this.productCount[index] = this.productCount[index] - 1
    }
    if (option == 'sumar') this.productCount[index] = this.productCount[index] + 1;
  }

  addCart(item: any, index: any) {
    this.orderItems = {
      quantity: this.productCount[index],
      product: item
    }
    if (this.orderItems.quantity == 0) return
    this.validateCart()
    localStorage.setItem('cart', JSON.stringify(this.addCartItems))
    //INFO funcion para añadir al carrito
    this.ComunicationService.enviarProductos(this.addCartItems)
  }

  validateCart() {
    //INFO valida si el producto ya existe y si es asi lo reemplaza
    if (this.addCartItems.length == 0) this.addCartItems.push(this.orderItems)
    let cartResult = this.addCartItems.some((data: any) => data.product.id == this.orderItems.product.id)
    if (cartResult) {
      this.addCartItems = this.addCartItems.map((data: any) => {
        if (data.product.id == this.orderItems.product.id) return data = this.orderItems
        return data
      })
    } else {
      this.addCartItems.push(this.orderItems)
    }
  }

}
