import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConnectionService } from 'src/app/service/connection/connection.service';
import { UserService } from './../../service/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(
    private ConnectionServicervice: ConnectionService,
    private UserService: UserService,
    private fb: FormBuilder,
  ) { }

  success: Boolean = false
  userData = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
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
    this.UserService.getUserData().subscribe((data: any) => {
      this.userData.setValue({
        name: data.name,
        email: data.email,
        password: '',
        phone: data.phone,
        apartment: data.apartment,
        street: data.street,
        zip: data.zip,
        country: data.country,
        city: data.city,
      })
    })
  }

  onSubmit() {
    const dataUser = {
      name: this.userData.get('name')?.value,
      email: this.userData.get('email')?.value,
      password: this.userData.get('password')?.value,
      phone: this.userData.get('phone')?.value,
      apartment: this.userData.get('apartment')?.value,
      street: this.userData.get('street')?.value,
      zip: this.userData.get('zip')?.value,
      country: this.userData.get('country')?.value,
      city: this.userData.get('city')?.value
    }
    this.ConnectionServicervice.modifyUser(dataUser).subscribe(data => {
      this.success = true
      return data
    })
  }
}
