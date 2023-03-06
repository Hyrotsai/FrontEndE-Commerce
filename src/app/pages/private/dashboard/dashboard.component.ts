import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../service/user/user.service';
import { ComunicationService } from './../../../service/comunication/comunication.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private UserService: UserService,
    private Router: Router
  ) {
    // this.UserService.getUserData().subscribe(data => { this.userData = data })
    // console.log(this.userData)
  }
  userData: any = ''

  async ngOnInit(): Promise<void> {
    this.UserService.getUserData().subscribe(data => { this.userData = data }, error => this.Router.navigate(['/'])
    )
  }

}
