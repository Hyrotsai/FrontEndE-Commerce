import { UserService } from './../../service/user/user.service';
import { ConnectionService } from 'src/app/service/connection/connection.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-shopping-detail',
  templateUrl: './my-shopping-detail.component.html',
  styleUrls: ['./my-shopping-detail.component.css']
})
export class MyShoppingDetailComponent implements OnInit {

  constructor(
    private Router: ActivatedRoute,
    private ConnectionService: ConnectionService,
    private UserService: UserService
  ) { }

  id: any
  order: any
  total: any = 0
  user: any

  async ngOnInit(): Promise<void> {
    this.id = this.Router.snapshot.paramMap.get('id')
    this.order = await this.ConnectionService.getOrderById(this.id).toPromise()
    this.user = await this.UserService.getUserData().toPromise()
    this.getTotalPrices()
  }

  getTotalPrices() {
    this.order.orderItems.forEach((data: any) => {
      this.total += data.quantity * data.product.price
    })
  }

}
