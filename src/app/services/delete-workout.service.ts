import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteWorkoutService {
  apiUrl: string = `${environment.apiURL}/workouts/`

  constructor(private httpClient: HttpClient) {}

  execute(userId: string): Observable<number> {
    const originalApiUrl = this.apiUrl; // Store the original value
    this.apiUrl += userId;

    return this.httpClient.delete<number>(this.apiUrl).pipe(
      finalize(() => {
        this.apiUrl = originalApiUrl; // Reset to the original value
      })
    );
  }
}
