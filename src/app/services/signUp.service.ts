import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.types';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private httpClient: HttpClient) { }

  signUp(userData: any) {
    return this.httpClient.post<LoginResponse>("/cadastro", userData).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token);
      })
    );
  }
}
