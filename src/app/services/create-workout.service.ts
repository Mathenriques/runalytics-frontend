import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateWorkoutResponse } from '../types/create-workout-response.types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateWorkoutService {
  apiUrl: string = `${environment.apiURL}/workouts`

  constructor(private httpClient: HttpClient) { }

  createWorkout(workoutData: any) {
    return this.httpClient.post<CreateWorkoutResponse>(this.apiUrl, workoutData)
  }
}
