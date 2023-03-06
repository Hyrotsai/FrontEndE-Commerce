import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  constructor() { }

  info: any
  handler = false

  ngOnInit(): void {
    this.checkHandler()
  }

  getData(data: any) {
    this.info = data
  }

  checkHandler() {
    setTimeout(() => {
      this.handler = true
    }, 1000);
  }

}
