import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private translate: TranslateService
  ) { }

  lang = ['en', 'es']

  switchLanguage(lang: any) {
    localStorage.setItem('lang', lang)
    return this.translate.use(lang)
  }

  getCurrentLang() {
    return this.translate.getDefaultLang()
  }

}
