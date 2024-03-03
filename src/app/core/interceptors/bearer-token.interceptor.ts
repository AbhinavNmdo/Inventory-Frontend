import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { UserLoginService } from '../services/user-login.service';
import { inject } from '@angular/core';

export const bearerTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const userLoginService = inject(UserLoginService);

  let localData = localStorage.getItem('ang-inv-user');
  let loggedInUser: any = localData != null ? JSON.parse(localData) : {};

  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${loggedInUser?.token}`
    }
  });

  return next(localData != null ? cloneRequest : req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == 401 && localData != null) {
        userLoginService.getRefreshToken();
      }
      return throwError(error);
    })
  );
};
