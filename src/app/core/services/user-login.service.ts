import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviornments/enviornment';
import { Observable, Subject, Subscription } from 'rxjs';
import { ApiResponseInterface } from '../interfaces/loginuser-interface';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  public $refreshToken = new Subject<boolean>;
  protected baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {
    this.$refreshToken.subscribe((res: boolean) => {
      this.getRefreshToken();
    })
  }

  userLogin(item: Object): Observable<ApiResponseInterface> {
    return this.http.post<ApiResponseInterface>(`${this.baseUrl}/login`, item);
  }

  getRefreshToken(): Subscription {
    return this.http.post<ApiResponseInterface>(`${this.baseUrl}/refresh`, {}).subscribe((res: any) => {
      localStorage.setItem('ang-inv-user', JSON.stringify(res.data));
    });
  }

  getLoggedInUser(): Observable<ApiResponseInterface> {
    return this.http.post<ApiResponseInterface>(`${this.baseUrl}/me`, {});
  }

  logoutUser(): Observable<ApiResponseInterface> {
    return this.http.delete<ApiResponseInterface>(`${this.baseUrl}/logout`);
  }
}
