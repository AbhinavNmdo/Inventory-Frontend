import { Component } from '@angular/core';
import { UserLoginService } from '../../core/services/user-login.service';
import { IApiResponce } from '../../core/interfaces/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor (
    private userLoginService: UserLoginService,
    private router: Router
  ) {}

  logoutUser(): void
  {
    if (confirm('Are you sure to logout?')) {
      this.userLoginService.logoutUser().subscribe((res:IApiResponce) => {
        if (res.status == 200) {
          localStorage.removeItem('ang-inv-user');
          this.router.navigateByUrl('login');
        }
      })
    }
  }
}
