import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAllAthletesService {
  apiUrl: string = `${environment.apiURL}/users`
  params: HttpParams = new HttpParams();

  constructor(private httpClient: HttpClient) {}

  execute(skip: number, take: number): Observable<any[]> {
    this.params = this.params.append('skip', skip);
    this.params = this.params.append('take', take);

    return this.httpClient.get<any[]>(this.apiUrl, { params: this.params})
  }
}
