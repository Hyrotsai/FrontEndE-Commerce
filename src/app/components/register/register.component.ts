import { AuthService } from './../../service/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConnectionService } from './../../service/connection/connection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private ConnectionServicervice: ConnectionService,
    private fb: FormBuilder,
    private Router: Router,
    private AuthService: AuthService
  ) { }

  loading: Boolean = false
  userData = this.fb.group({
    user: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', Validators.required],
    password: ['', Validators.required],
    phone: ['', Validators.required],
    apartment: ['', Validators.required],
    street: ['', Validators.required],
    zip: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
  });

  ngOnInit(): void {
  }

  onSubmit() {
    const dataUser = {
      name: this.userData.get('user')?.value,
      email: this.userData.get('email')?.value,
      password: this.userData.get('password')?.value,
      phone: this.userData.get('phone')?.value,
      apartment: this.userData.get('apartment')?.value,
      street: this.userData.get('street')?.value,
      zip: this.userData.get('zip')?.value,
      country: this.userData.get('country')?.value,
      city: this.userData.get('city')?.value
    }
    this.loading = true
    this.ConnectionServicervice.registerUser(dataUser).subscribe((data: any) => {
      this.ConnectionServicervice.loginUser(dataUser).subscribe((data: any) => {
        localStorage.setItem('token', data.token)
        this.AuthService.login()
        this.loading = false
        this.Router.navigate(['/dashboard'])
      })
    }, err => {
      this.loading = false
    })
    this.userData.reset()
  }
}