import { Component } from '@angular/core';
import { UserLoginService } from '../../core/services/user-login.service';
import { ApiResponseInterface } from '../../core/interfaces/loginuser-interface';
import { Router } from '@angular/router';
import { ConfirmModalService } from '../../core/components/confirm-modal/confirm-modal.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor (
    private userLoginService: UserLoginService,
    private router: Router,
    private confirmModalService: ConfirmModalService
  ) {}

  logoutUser(): void
  {
    this.confirmModalService.setConfirm({
      data: null,
      title: 'Are you sure to logout?',
      onConfirm: () => {
        this.userLoginService.logoutUser().subscribe((res:ApiResponseInterface) => {
          if (res.status == 200) {
            localStorage.removeItem('ang-inv-user');
            this.router.navigateByUrl('login');
          }
        })
      },
      onCancel: () => {}
    });
  }
}
