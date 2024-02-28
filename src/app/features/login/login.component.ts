import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ApiResponseInterface,
  LoginUserInterface,
} from '../../core/interfaces/loginuser-interface';
import { UserLoginService } from '../../core/services/user-login.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from '../../enviornments/enviornment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private userLoginService: UserLoginService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle(`Login | ${environment.projectName}`);
  }

  loginUser: FormGroup<LoginUserInterface> = new FormGroup<LoginUserInterface>({
    username: new FormControl('abhaynam22', [Validators.required]),
    password: new FormControl('Admin@123', [Validators.required]),
  });

  loginUserCall() {
    this.userLoginService.userLogin(this.loginUser.value).subscribe(
      (res: ApiResponseInterface) => {
        if (res.status == 200) {
          localStorage.setItem('ang-inv-user', JSON.stringify(res.data));
          this.router.navigateByUrl('admin/dashboard');
        } else {
          alert(res.msg);
        }
      },
      (errors) => {
        alert('Something went wrong');
      }
    );
  }
}
