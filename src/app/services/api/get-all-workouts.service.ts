import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateWorkoutResponse } from '../../types/create-workout-response.types';

@Injectable({
  providedIn: 'root'
})
export class GetAllWorkoutsService {
  apiUrl: string = `${environment.apiURL}/workouts/`

  constructor(private httpClient: HttpClient) {}

  getData(userId: string | null): Observable<CreateWorkoutResponse[]> {
    this.apiUrl += userId;
    return this.httpClient.get<CreateWorkoutResponse[]>(this.apiUrl)
  }
}
