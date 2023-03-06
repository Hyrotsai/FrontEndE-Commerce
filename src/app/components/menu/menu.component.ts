import { AuthService } from './../../service/auth/auth.service';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { LanguageService } from './../../service/language/language.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private AuthService: AuthService,
    private LanguageService: LanguageService
  ) { }

  langBoolean = localStorage.getItem('lang') == 'es' ? true : false

  ngOnInit(): void {

  }

  logOut() {
    localStorage.clear()
    this.AuthService.logout()
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
