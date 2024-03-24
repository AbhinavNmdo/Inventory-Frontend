import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../enviornments/enviornment';
import { DashboardService } from '../../../core/services/dashboard.service';
import { ApiResponseInterface } from '../../../core/interfaces/loginuser-interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  dashboard?: {
    users: number;
    totalStocks: number;
    allotedStocks: number;
    damageStocks: number;
  };

  constructor (
    private titleService: Title,
    private dashboardService: DashboardService
  ) {
    this.titleService.setTitle(`Admin | ${environment.projectName}`)
  }

  ngOnInit(): void {
    this.dashboardService.index().subscribe((res: ApiResponseInterface) => {
      this.dashboard = res.data;
    });
  }

}
