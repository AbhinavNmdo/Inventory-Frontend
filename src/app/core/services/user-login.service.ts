import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviornments/enviornment';
import { urls } from '../constants/urls';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  public $refreshToken = new Subject<boolean>;

  constructor(
    private http: HttpClient
  ) {
    this.$refreshToken.subscribe((res:any) => {
      this.getRefreshToken();
    })
  }

  userLogin(item:any)
  {
    return this.http.post(environment.baseUrl + urls.loginUser, item);
  }

  getRefreshToken()
  {
    return this.http.post(environment.baseUrl + urls.refreshToken, {}).subscribe((res:any) => {
      localStorage.setItem('ang-inv-user', JSON.stringify(res.data));
    });
  }

  getLoggedInUser()
  {
    return this.http.post(environment.baseUrl + urls.loggedInUser, {});
  }

  logoutUser()
  {
    return this.http.delete(environment.baseUrl + urls.logoutUser);
  }
}
