import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DecodeJwtTokenService } from '../utils/decode-jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(private router: Router, private decodeJwtTokenService: DecodeJwtTokenService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authToken = localStorage.getItem('access_token');
    const { isAdmin } = this.decodeJwtTokenService.execute();

    if (authToken && isAdmin) {
      return true;
    } else {
      // Redirect to the home page if the user doesn't have an access token
      this.router.navigate(['/']);
      return false;
    }
  }
}
