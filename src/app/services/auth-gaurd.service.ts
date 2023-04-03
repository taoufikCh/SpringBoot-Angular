import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {
  constructor(private router:Router, private authService: UserService ) {
 
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.authService.islogin) {
       this.router.navigate(['/login']);
       return false;
      }
      return true;
  }
}
