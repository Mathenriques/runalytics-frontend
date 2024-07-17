import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfileResponse } from '../../types/user-profile-response.types';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetUserDataService {
  apiUrl: string = `${environment.apiURL}/users/`

  constructor(private httpClient: HttpClient) {}

  getData(userId: string | null): Observable<UserProfileResponse> {
    this.apiUrl += userId;
    return this.httpClient.get<UserProfileResponse>(this.apiUrl)
  }
}
