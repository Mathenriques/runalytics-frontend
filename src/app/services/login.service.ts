import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.types';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = 'http://localhost:3000/auth/sign-in'

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>(this.apiUrl, {email, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.access_token)
      })
    )
  }
}
