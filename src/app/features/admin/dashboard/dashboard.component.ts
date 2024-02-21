import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../enviornments/enviornment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor (
    private titleService: Title
  ) {
    this.titleService.setTitle(`Admin | ${environment.projectName}`)
  }

}
