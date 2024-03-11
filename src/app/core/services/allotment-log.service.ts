import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '../components/alert/alert.service';
import { Observable } from 'rxjs';
import { ApiResponseInterface } from '../interfaces/loginuser-interface';
import { DatatableReqInterface } from '../interfaces/datatable-interface';
import { environment } from '../../enviornments/enviornment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AllotmentLogService {
  protected baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

  index(item: DatatableReqInterface): Observable<ApiResponseInterface> {
    return this.http.post<ApiResponseInterface>(`${this.baseUrl}/allotment-log/index`, item);
  }

  // create(item: FormGroup<>): Observable<ApiResponseInterface> {

  // }
}
