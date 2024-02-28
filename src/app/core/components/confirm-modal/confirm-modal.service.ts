import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfirmModalInterface } from './confirm-modal-interface';

@Injectable({
  providedIn: 'root',
})
export class ConfirmModalService {
  public $confirm = new Subject<ConfirmModalInterface>();

  setConfirm(confirm: ConfirmModalInterface): void {
    this.$confirm.next(confirm);
  }
}
