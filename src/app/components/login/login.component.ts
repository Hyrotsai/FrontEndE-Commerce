import { LanguageService } from './../../service/language/language.service';
import { AuthService } from './../../service/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConnectionService } from './../../service/connection/connection.service';
import { Router } from '@angular/router';
import { ComunicationService } from './../../service/comunication/comunication.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private ConnectionService: ConnectionService,
    private ComunicationService: ComunicationService,
    private fb: FormBuilder,
    private Router: Router,
    private AuthService: AuthService,
    private translate: TranslateService,
    private LanguageService: LanguageService
  ) { }

  isLoggedError: boolean = false
  loading: Boolean = false
  isChecked = true;
  langBoolean = localStorage.getItem('lang') == 'es' ? true : false

  userData = this.fb.group({
    user: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  ngOnInit(): void {
    this.isLoggedError = false
  }

  onSubmit() {
    const dataUser = {
      email: this.userData.get('user')?.value,
      password: this.userData.get('password')?.value
    }
    this.loading = true
    this.ConnectionService.loginUser(dataUser).subscribe((data: any) => {
      this.loading = false
      localStorage.setItem('token', data.token)
      //INFO Cambiara el estado de login a true
      this.AuthService.login()
      this.Router.navigate(['/dashboard'])
    }, _err => this.isLoggedError = true)
    this.userData.reset()
  }

  changeLanguage(data: any) {
    if (data.checked == true) this.LanguageService.switchLanguage('es')
    if (data.checked == false) this.LanguageService.switchLanguage('en')
  }

  switchLanguage(lang: any) {
    this.LanguageService.switchLanguage(lang)
  }

  getLangs() {
    return this.LanguageService.lang
  }

  currentLang() {
    return this.LanguageService.getCurrentLang()
  }


}
