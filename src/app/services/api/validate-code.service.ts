import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValidateCodeService {
  apiUrl: string = `${environment.apiURL}/users/validate-code`

  constructor(private httpClient: HttpClient) {
  }

  execute(code: string) {
    return this.httpClient.post(this.apiUrl, { code });
  }
}
