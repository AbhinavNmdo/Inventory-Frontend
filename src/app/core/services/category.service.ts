import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { ApiResponseInterface } from '../interfaces/loginuser-interface';
import { environment } from '../../enviornments/enviornment';
import { AlertService } from '../components/alert/alert.service';
import { AlertTypeEnum } from '../enums/alert-type-enum';
import { Router } from '@angular/router';
import { DatatableReqInterface } from '../interfaces/datatable-interface';
import { CategoryStoreInterface, CategoryUpdateInterface } from '../interfaces/category-interface';
import { FormGroup } from '@angular/forms';

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

  index(item: DatatableReqInterface): Observable<ApiResponseInterface> {
    return this.http.post<ApiResponseInterface>(`${this.baseUrl}/category/index`, item);
  }

  store(item: FormGroup<CategoryStoreInterface>): Observable<ApiResponseInterface> {
    return this.http.post<ApiResponseInterface>(`${this.baseUrl}/category`, item.value).pipe(
      tap((res: ApiResponseInterface) => {
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

  show(id: number): Observable<ApiResponseInterface> {
    return this.http.get<ApiResponseInterface>(`${this.baseUrl}/category/${id}`);
  }

  update(id: string, item: FormGroup<CategoryUpdateInterface>): Observable<ApiResponseInterface> {
    return this.http.put<ApiResponseInterface>(`${this.baseUrl}/category/${id}`, item).pipe(
      tap((res: ApiResponseInterface) => {
        this.router.navigateByUrl('admin/category');
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
    return this.http.delete<ApiResponseInterface>(`${this.baseUrl}/category/${id}`).pipe(
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
