import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AlertInterface } from '../../interfaces/alert-interface';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public $alert = new Subject<AlertInterface>();

  setAlert(alert: AlertInterface): void
  {
    this.$alert.next(alert);
  }

  getAlert(): Observable<AlertInterface>
  {
    return this.$alert.asObservable();
  }
}
