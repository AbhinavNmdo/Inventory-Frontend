import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '../components/alert/alert.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { ApiResponseInterface } from '../interfaces/loginuser-interface';
import { DatatableReqInterface } from '../interfaces/datatable-interface';
import { environment } from '../../enviornments/enviornment';
import { FormGroup } from '@angular/forms';
import { ProductStoreInterface, ProductUpdateInterface } from '../interfaces/product-interface';
import { Router } from '@angular/router';
import { AlertTypeEnum } from '../enums/alert-type-enum';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  protected baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private router: Router
  ) { }

  index(item: DatatableReqInterface): Observable<ApiResponseInterface> {
    return this.http.post<ApiResponseInterface>(`${this.baseUrl}/product/index`, item);
  }

  store(item: FormGroup<ProductStoreInterface>): Observable<ApiResponseInterface> {
    return this.http.post<ApiResponseInterface>(`${this.baseUrl}/product`, item.value).pipe(
      tap((res: ApiResponseInterface) => {
        this.router.navigateByUrl('admin/product').finally(() => {
          setTimeout(() => {
            this.alertService.setAlert({
              type: res.status == 200 ? AlertTypeEnum.success : AlertTypeEnum.danger,
              text: res.msg
            })
          }, 100);
        })
      }),
      catchError((res) => {
        this.alertService.setAlert({
          type: AlertTypeEnum.danger,
          text: res.error?.msg ?? 'Something went wrong'
        });
        return of(res);
      })
    );
  }

  show(id: number): Observable<ApiResponseInterface> {
    return this.http.get<ApiResponseInterface>(`${this.baseUrl}/product/${id}`);
  }

  update(id: number, item: FormGroup<ProductUpdateInterface>): Observable<ApiResponseInterface> {
    return this.http.put<ApiResponseInterface>(`${this.baseUrl}/product/${id}`, item.value).pipe(
      tap((res: ApiResponseInterface) => {
        this.router.navigateByUrl('admin/product').finally(() => {
          setTimeout(() => {
            this.alertService.setAlert({
              type: res.status == 200 ? AlertTypeEnum.success : AlertTypeEnum.danger,
              text: res.msg
            });
          }, 100);
        })
      }),
      catchError((res) => {
        this.alertService.setAlert({
          type: AlertTypeEnum.danger,
          text: res.error?.msg ?? 'Something went wrong'
        });
        return of(res);
      })
    )
  }

  destroy(id: number): Observable<ApiResponseInterface> {
    return this.http.delete<ApiResponseInterface>(`${this.baseUrl}/product/${id}`).pipe(
      tap((res: ApiResponseInterface) => {
        this.router.navigateByUrl('admin/product').finally(() => {
          setTimeout(() => {
            this.alertService.setAlert({
              type: res.status == 200 ? AlertTypeEnum.success : AlertTypeEnum.danger,
              text: res.msg
            });
          }, 100);
        })
      }),
      catchError((res) => {
        this.alertService.setAlert({
          type: AlertTypeEnum.danger,
          text: res.error?.msg ?? 'Something went wrong'
        });
        return of(res);
      })
    );
  }
}
