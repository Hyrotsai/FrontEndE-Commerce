import { UserService } from './../../service/user/user.service';
import { ConnectionService } from './../../service/connection/connection.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-shopping',
  templateUrl: './my-shopping.component.html',
  styleUrls: ['./my-shopping.component.css']
})
export class MyShoppingComponent implements OnInit {

  constructor(
    private ConnectionService: ConnectionService,
    private UserService: UserService,
  ) { }

  user: any
  orders: any
  orderCero = false

  async ngOnInit(): Promise<void> {
    // this.UserService.getUserData().subscribe(data => {
    //   this.user = data
    //   this.ConnectionService.getUserOrders(this.user.id).subscribe(data => console.log(data))
    // }
    // )
    this.orderCero = false
    try {
      //INFO otra forma de hacer el llamado a observables convirtiendolos en promesas
      this.user = await this.UserService.getUserData().toPromise()
      this.orders = await this.ConnectionService.getUserOrders(this.user.id).toPromise()
    } catch (error: any) {
      this.orders = {}
      this.orderCero = true
    }
  }

}
