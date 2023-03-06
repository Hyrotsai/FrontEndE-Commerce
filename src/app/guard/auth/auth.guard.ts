import { AuthService } from './../../service/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private AuthService: AuthService,
    private router: Router
  ) { }

  canActivate(): any {
    if (this.AuthService.getState()) {
      return true;
    } else {
      return this.router.parseUrl('/');
    }
  }

}