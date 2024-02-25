import { Component, OnInit } from '@angular/core';
import { AlertInterface } from './alert-interface';
import { AlertService } from './alert.service';
import { animate, style, transition, trigger } from '@angular/animations';

const enterTransition = transition(':enter', [
  style({
    opacity: 0
  }),
  animate('0.3s ease-in-out', style({ opacity: 1 }))
]);
const fadeIn = trigger('fadeIn', [enterTransition])
const leaveTransition = transition(':leave', [
  style({
    opacity: 1
  }),
  animate('0.3s ease-in-out', style({ opacity: 0 }))
]);
const fadeOut = trigger('fadeOut', [leaveTransition])

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  animations: [fadeIn, fadeOut]
})
export class AlertComponent implements OnInit {
  alert?: AlertInterface;

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.alertService.getAlert().subscribe((alert) => {
      this.alert = alert;
    });

    setTimeout(() => {
      this.hideAlert();
    }, 10000);
  }

  hideAlert() {
    this.alert = undefined;
  }
}
