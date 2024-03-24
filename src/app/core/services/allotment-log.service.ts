import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '../components/alert/alert.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { ApiResponseInterface } from '../interfaces/loginuser-interface';
import { DatatableReqInterface } from '../interfaces/datatable-interface';
import { environment } from '../../enviornments/enviornment';
import { FormGroup } from '@angular/forms';
import { AllotmentLogReturn, AllotmentLogStore } from '../interfaces/allotment-log-interface';
import { Router } from '@angular/router';
import { AlertTypeEnum } from '../enums/alert-type-enum';

@Injectable({
  providedIn: 'root'
})
export class AllotmentLogService {
  protected baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private router: Router
  ) { }

  index(item: DatatableReqInterface): Observable<ApiResponseInterface> {
    return this.http.post<ApiResponseInterface>(`${this.baseUrl}/allotment/index`, item);
  }

  allotProduct(item: FormGroup<AllotmentLogStore>): Observable<ApiResponseInterface> {
    return this.http.post<ApiResponseInterface>(`${this.baseUrl}/allotment/allot-product`, item.value).pipe(
      tap((res: ApiResponseInterface) => {
        this.router.navigateByUrl('admin/allotment');
        setTimeout(() => {
          this.alertService.setAlert({
            type: res.status == 200 ? AlertTypeEnum.success : AlertTypeEnum.danger,
            text: res.msg
          });
        }, 100);
      }),
      catchError((res) => {
        this.alertService.setAlert({
          type: AlertTypeEnum.danger,
          text: res.error?.msg ?? 'Something went wrong'
        })
        return of(res);
      })
    )
  }

  returnProduct(id: string, item: FormGroup<AllotmentLogReturn>): Observable<ApiResponseInterface> {
    return this.http.post<ApiResponseInterface>(`${this.baseUrl}/allotment/return-product/${id}`, item.value).pipe(
      tap((res: ApiResponseInterface) => {
        this.router.navigateByUrl('admin/allotment');
        setTimeout(() => {
          this.alertService.setAlert({
            type: res.status == 200 ? AlertTypeEnum.success : AlertTypeEnum.danger,
            text: res.msg
          });
        }, 100);
      }),
      catchError((res) => {
        this.alertService.setAlert({
          type: AlertTypeEnum.danger,
          text: res.error?.msg ?? 'Something went wrong'
        })
        return of(res);
      })
    )
  }
}
