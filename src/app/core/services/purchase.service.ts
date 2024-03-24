import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../components/alert/alert.service';
import { environment } from '../../enviornments/enviornment';
import { Observable, catchError, of, tap } from 'rxjs';
import { ApiResponseInterface } from '../interfaces/loginuser-interface';
import { DatatableReqInterface } from '../interfaces/datatable-interface';
import { FormGroup } from '@angular/forms';
import { AlertTypeEnum } from '../enums/alert-type-enum';
import { PurchaseStoreInterface } from '../interfaces/purchase-interface';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  protected baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService
  ) { }

  index(item: DatatableReqInterface): Observable<ApiResponseInterface>
  {
    return this.http.post<ApiResponseInterface>(`${this.baseUrl}/purchase/index`, item);
  }

  store(item: FormGroup<PurchaseStoreInterface>): Observable<ApiResponseInterface>
  {
    return this.http.post<ApiResponseInterface>(`${this.baseUrl}/purchase`, item.value).pipe(
      tap((res: ApiResponseInterface) => {
        this.router.navigateByUrl('admin/purchase').finally(() => {
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
          text: res.error?.msg ?? 'Something went wrong.'
        });

        return of(res);
      })
    )
  }

  show(id: string): Observable<ApiResponseInterface> {
    return this.http.get<ApiResponseInterface>(`${this.baseUrl}/purchase/${id}`);
  }

  getVendorNameList(): Observable<ApiResponseInterface> {
    return this.http.get<ApiResponseInterface>(`${this.baseUrl}/purchase/vendors`);
  }
}
