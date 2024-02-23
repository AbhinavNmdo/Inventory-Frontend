import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviornments/enviornment';
import { urls } from '../constants/application-constants';
import { Subject } from 'rxjs';
import { IApiResponce, ILoginUser } from '../interfaces/login';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  public $refreshToken = new Subject<boolean>;

  constructor(
    private http: HttpClient
  ) {
    this.$refreshToken.subscribe((res:boolean) => {
      this.getRefreshToken();
    })
  }

  userLogin(item:Object)
  {
    return this.http.post<IApiResponce>(environment.baseUrl + urls.loginUser, item);
  }

  getRefreshToken()
  {
    return this.http.post<IApiResponce>(environment.baseUrl + urls.refreshToken, {}).subscribe((res:any) => {
      localStorage.setItem('ang-inv-user', JSON.stringify(res.data));
    });
  }

  getLoggedInUser()
  {
    return this.http.post<IApiResponce>(environment.baseUrl + urls.loggedInUser, {});
  }

  logoutUser()
  {
    return this.http.delete<IApiResponce>(environment.baseUrl + urls.logoutUser);
  }
}
