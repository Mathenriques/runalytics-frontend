import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfileResponse } from '../../types/user-profile-response.types';
import { finalize, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetUserDataService {
  apiUrl: string = `${environment.apiURL}/users/profile/`

  constructor(private httpClient: HttpClient) {}

  getData(userId: string | null): Observable<UserProfileResponse> {
    const originalApiUrl = this.apiUrl; // Store the original value
    this.apiUrl += userId;

    return this.httpClient.get<UserProfileResponse>(this.apiUrl).pipe(
      finalize(() => {
        this.apiUrl = originalApiUrl; // Reset to the original value
      })
    );
  }
}
