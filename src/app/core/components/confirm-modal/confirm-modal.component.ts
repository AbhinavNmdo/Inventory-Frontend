import { Component, OnInit } from '@angular/core';
import { ConfirmModalService } from './confirm-modal.service';
import { ConfirmModalInterface } from './confirm-modal-interface';
import { animate, style, transition, trigger } from '@angular/animations';

const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate('0.3s ease-in-out', style({ opacity: 1 })),
]);
const fadeIn = trigger('fadeIn', [enterTransition]);
const leaveTransition = transition(':leave', [
  style({
    opacity: 1,
  }),
  animate('0.3s ease-in-out', style({ opacity: 0 })),
]);
const fadeOut = trigger('fadeOut', [leaveTransition]);

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css',
  animations: [fadeIn, fadeOut],
})
export class ConfirmModalComponent implements OnInit {
  public confirm?: ConfirmModalInterface;

  constructor(
    private confirmModalService: ConfirmModalService
  ) {}

  ngOnInit(): void {
    this.confirmModalService.$confirm.subscribe((res) => {
      this.confirm = res;
    });
  }

  hideConfirm(): void {
    this.confirm = undefined;
  }

  onConfirmCall(data: any): void {
    this.confirm?.onConfirm(data);
    this.hideConfirm();
  }

  onCancelCall(data: any): void {
    this.confirm?.onCancel(data);
    this.hideConfirm();
  }
}
