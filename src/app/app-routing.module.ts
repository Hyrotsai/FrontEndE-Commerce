import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/public/home/home.component';
import { DashboardComponent } from './pages/private/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { CheckoutComponent } from './pages/private/checkout/checkout.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EnrollProductComponent } from './components/enroll-product/enroll-product.component';
import { BuyComponent } from './components/buy/buy.component';
import { MyShoppingComponent } from './components/my-shopping/my-shopping.component';
import { MyShoppingDetailComponent } from './components/my-shopping-detail/my-shopping-detail.component';
import { Error404Component } from './components/error404/error404.component';
import { AuthGuard } from './guard/auth/auth.guard';
import { LoggedGuard } from './guard/logged/logged.guard';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoggedGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/register-product', component: EnrollProductComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/buy', component: BuyComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/my-shopping', component: MyShoppingComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/my-shopping/buy-detail/:id', component: MyShoppingDetailComponent, canActivate: [AuthGuard] },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
