import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  apiUrl: string = `${environment.apiURL}/users/restore-password`

  constructor(private httpClient: HttpClient) {
  }

  execute(code: string, email: string, password: string) {
    return this.httpClient.patch(this.apiUrl, { code, email, password });
  }
}
