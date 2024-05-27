import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  apiUrl: string = 'http://localhost:3000/users'

  constructor(private httpClient: HttpClient) { }

  signUp(userData: any) {
  return this.httpClient.post<void>(this.apiUrl, userData).pipe(
      tap(() => {
        console.log("User signed up successfully.");
      })
    );
  }
}
