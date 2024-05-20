import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.types';
import { map, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = 'http://localhost:3000/auth/sign-in';
  jwtHelper: JwtHelperService;

  constructor(private httpClient: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>(this.apiUrl, {email, password}).pipe(
      map((value) => {
        sessionStorage.setItem("auth-token", value.access_token)
        const decodedToken = this.jwtHelper.decodeToken(value.access_token);
        return decodedToken.sub;
      })
    )
  }
}
