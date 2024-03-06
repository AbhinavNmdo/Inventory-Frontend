import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../components/alert/alert.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { ApiResponseInterface } from '../interfaces/loginuser-interface';
import { DatatableReqInterface } from '../interfaces/datatable-interface';
import { environment } from '../../enviornments/enviornment';
import { FormGroup } from '@angular/forms';
import { UserStoreInterface, UserUpdateInterface } from '../interfaces/user-interface';
import { AlertTypeEnum } from '../enums/alert-type-enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService
  ) { }

  index(item: DatatableReqInterface): Observable<ApiResponseInterface>
  {
    return this.http.post<ApiResponseInterface>(`${this.baseUrl}/user/index`, item);
  }

  store(item: FormGroup<UserStoreInterface>): Observable<ApiResponseInterface> {
    return this.http.post<ApiResponseInterface>(`${this.baseUrl}/user`, item.value).pipe(
      tap((res: ApiResponseInterface) => {
        this.router.navigateByUrl('admin/user').finally(() => {
          setTimeout(() => {
            this.alertService.setAlert({
              type: res.status == 200 ? AlertTypeEnum.success : AlertTypeEnum.danger,
              text: res.msg
            });
          }, 100);
        });
      }),
      catchError((res) => {
        this.alertService.setAlert({
          type: AlertTypeEnum.danger,
          text: res.error?.msg ?? 'Something went wrong'
        })
        return of(res);
      })
    );
  }

  show(id: number): Observable<ApiResponseInterface> {
    return this.http.get<ApiResponseInterface>(`${this.baseUrl}/user/${id}`);
  }

  update(id: number, item: FormGroup<UserUpdateInterface>): Observable<ApiResponseInterface> {
    return this.http.put<ApiResponseInterface>(`${this.baseUrl}/user/${id}`, item.value).pipe(
      tap((res: ApiResponseInterface) => {
        this.router.navigateByUrl('admin/user');
        setTimeout(() => {
          this.alertService.setAlert({
            type: res.status == 200 ? AlertTypeEnum.success : AlertTypeEnum.danger,
            text: res.msg
          });
        }, 100);
      }),
      catchError((res: ApiResponseInterface) => {
        this.alertService.setAlert({
          type: AlertTypeEnum.danger,
          text: res?.msg ?? 'Something went wrong'
        })
        return of(res);
      })
    );
  }

  destory(id: number): Observable<ApiResponseInterface> {
    return this.http.delete<ApiResponseInterface>(`${this.baseUrl}/user/${id}`).pipe(
      tap((res: ApiResponseInterface) => {
        setTimeout(() => {
          this.alertService.setAlert({
            type: res.status == 200 ? AlertTypeEnum.success : AlertTypeEnum.danger,
            text: res.msg
          });
        }, 100);
      }),
      catchError((res: ApiResponseInterface) => {
        this.alertService.setAlert({
          type: AlertTypeEnum.danger,
          text: res?.msg ?? 'Something went wrong'
        })
        return of(res);
      })
    );
  }
}
