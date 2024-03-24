import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseInterface } from '../interfaces/loginuser-interface';
import { environment } from '../../enviornments/enviornment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  protected baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<ApiResponseInterface> {
    return this.http.get<ApiResponseInterface>(`${this.baseUrl}/dashboard`);
  }
}
