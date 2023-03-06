import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/service/user/user.service';
import { AuthService } from './../../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

  error: any

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private UserService: UserService,
  ) { }

  async canActivate() {


    if (this.AuthService.getState()) {
      try {
        this.error = await this.UserService.getUserData().toPromise()
      } catch (error) {
        this.AuthService.logout()
        return true
      }
      return this.router.parseUrl('/dashboard');
    } else {
      return true;
    }
  }

}
