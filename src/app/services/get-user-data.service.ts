import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfileResponse } from '../types/user-profile-response.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUserDataService {
  apiUrl: string = `http://localhost:3000/users/`

  constructor(private httpClient: HttpClient) {}

  getData(userId: string | null): Observable<UserProfileResponse> {
    this.apiUrl += userId;
    return this.httpClient.get<UserProfileResponse>(this.apiUrl)
  }
}
