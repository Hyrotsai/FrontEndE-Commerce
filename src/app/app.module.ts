import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './pages/public/home/home.component';
import { DashboardComponent } from './pages/private/dashboard/dashboard.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EnrollProductComponent } from './components/enroll-product/enroll-product.component';
import { MyShoppingComponent } from './components/my-shopping/my-shopping.component';
import { BuyComponent } from './components/buy/buy.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './pages/private/checkout/checkout.component';
import { MyShoppingDetailComponent } from './components/my-shopping-detail/my-shopping-detail.component';
import { LoadingComponent } from './components/loading/loading.component';
import { Error404Component } from './components/error404/error404.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Registrar el idioma español
registerLocaleData(localeEs);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

function getLanguage() {
  if (localStorage.getItem('lang') === 'es') return 'es'
  if (localStorage.getItem('lang') === 'en') return 'en'
  return 'en'
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    MenuComponent,
    UserProfileComponent,
    EnrollProductComponent,
    MyShoppingComponent,
    BuyComponent,
    CartComponent,
    CheckoutComponent,
    ProductCardComponent,
    MyShoppingDetailComponent,
    LoadingComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      defaultLanguage: getLanguage(), // idioma predeterminado
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' } // Establecer el valor LOCALE_ID como 'es'
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
