import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { IApiResponce } from '../interfaces/login';
import { environment } from '../../enviornments/enviornment';
import { AlertService } from '../components/alert/alert.service';
import { AlertTypeEnum } from '../enums/alert-type-enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  protected baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private router: Router
  ) { }

  index(item: any): Observable<IApiResponce> {
    return this.http.post<IApiResponce>(`${this.baseUrl}/category/index`, item);
  }

  store(item: any): Observable<IApiResponce> {
    return this.http.post<IApiResponce>(`${this.baseUrl}/category`, item).pipe(
      tap((res: IApiResponce) => {
        this.router.navigateByUrl('admin/category').finally(() => {
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

  show(id: string): Observable<IApiResponce> {
    return this.http.get<IApiResponce>(`${this.baseUrl}/category/${id}`);
  }

  update(id: string, item: any): Observable<IApiResponce> {
    return this.http.put<IApiResponce>(`${this.baseUrl}/category/${id}`, item).pipe(
      tap((res: IApiResponce) => {
        this.router.navigateByUrl('admin/category');
        setTimeout(() => {
          this.alertService.setAlert({
            type: res.status == 200 ? AlertTypeEnum.success : AlertTypeEnum.danger,
            text: res.msg
          });
        }, 100);
      }),
      catchError((res: IApiResponce) => {
        this.alertService.setAlert({
          type: AlertTypeEnum.danger,
          text: res?.msg ?? 'Something went wrong'
        })
        return of(res);
      })
    );
  }

  destory(id: number): Observable<IApiResponce> {
    return this.http.delete<IApiResponce>(`${this.baseUrl}/category/${id}`).pipe(
      tap((res: IApiResponce) => {
        setTimeout(() => {
          this.alertService.setAlert({
            type: res.status == 200 ? AlertTypeEnum.success : AlertTypeEnum.danger,
            text: res.msg
          });
        }, 100);
      }),
      catchError((res: IApiResponce) => {
        this.alertService.setAlert({
          type: AlertTypeEnum.danger,
          text: res?.msg ?? 'Something went wrong'
        })
        return of(res);
      })
    );
  }
}
