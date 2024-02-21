import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IApiResponce, ILoginUser } from '../../core/interfaces/login';
import { UserLoginService } from '../../core/services/user-login.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from '../../enviornments/enviornment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor (
    private userLoginService: UserLoginService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle(`Login | ${environment.projectName}`)
  }

  loginUser:FormGroup<ILoginUser> = new FormGroup<ILoginUser>({
    username: new FormControl('abhaynam22', [Validators.required]),
    password: new FormControl('Admin@123', [Validators.required])
  });

  loginUserCall () {
    this.userLoginService.userLogin(this.loginUser.value).subscribe((res:any) => {
      if (res.status == 200) {
        localStorage.setItem('ang-inv-user', JSON.stringify(res.data));
        this.router.navigateByUrl('admin');
      } else {
        alert(res.message);
      }
    }, errors => {
      console.log(errors)
      alert('Something went wrong');
    })
  }
}
