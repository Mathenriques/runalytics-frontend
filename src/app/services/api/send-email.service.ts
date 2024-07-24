import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  apiUrl: string = `${environment.apiURL}/users/email-recovery`

  constructor(private httpClient: HttpClient) {
  }

  execute(email: string) {
    return this.httpClient.post(this.apiUrl, { email });
  }
}
