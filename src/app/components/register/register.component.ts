import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConnectionService } from './../../service/connection/connection.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private ConnectionServicervice: ConnectionService,
    private fb: FormBuilder,
  ) { }

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
    this.ConnectionServicervice.registerUser(dataUser).subscribe((data: any) => { }, err => console.log(err.error))
    this.userData.reset()
  }
}