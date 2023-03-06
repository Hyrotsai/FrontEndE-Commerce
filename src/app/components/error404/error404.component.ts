import { AuthService } from './../../service/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {

  constructor(
    private AuthService: AuthService
  ) { }

  state: any

  ngOnInit(): void {
    this.state = this.AuthService.getState()
  }

}
