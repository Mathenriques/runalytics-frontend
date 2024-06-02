import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.types';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  apiUrl: string = `${environment.apiURL}/users`


  constructor(private httpClient: HttpClient) { }

  signUp(userData: any) {
    return this.httpClient.post<LoginResponse>(this.apiUrl, userData).pipe(
      tap((value) => {
        sessionStorage.setItem("access_token", value.access_token);
      })
    );
  }
}
