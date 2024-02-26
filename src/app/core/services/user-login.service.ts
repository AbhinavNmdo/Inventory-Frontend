import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviornments/enviornment';
import { Observable, Subject, Subscription } from 'rxjs';
import { IApiResponce } from '../interfaces/login';

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

  userLogin(item: Object): Observable<IApiResponce> {
    return this.http.post<IApiResponce>(`${this.baseUrl}/login`, item);
  }

  getRefreshToken(): Subscription {
    return this.http.post<IApiResponce>(`${this.baseUrl}/refresh`, {}).subscribe((res: any) => {
      localStorage.setItem('ang-inv-user', JSON.stringify(res.data));
    });
  }

  getLoggedInUser(): Observable<IApiResponce> {
    return this.http.post<IApiResponce>(`${this.baseUrl}/me`, {});
  }

  logoutUser(): Observable<IApiResponce> {
    return this.http.delete<IApiResponce>(`${this.baseUrl}/logout`);
  }
}
