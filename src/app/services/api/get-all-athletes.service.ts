import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { finalize, Observable } from 'rxjs';
import { GetAllUsersResponse } from '../../types/get-all-users-response.types';

@Injectable({
  providedIn: 'root'
})
export class GetAllAthletesService {
  apiUrl: string = `${environment.apiURL}/users`
  
  constructor(private httpClient: HttpClient) {}
  
  execute(skip: number): Observable<GetAllUsersResponse> {
    let params: HttpParams = new HttpParams();
    params = params.append('skip', skip);
    params = params.append('take', 10);

    return this.httpClient.get<GetAllUsersResponse>(
      this.apiUrl, 
      { params: params}
    )
  }
}
