import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInterface, UserUpdateInterface } from '../../../../core/interfaces/user-interface';
import { UserService } from '../../../../core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ApiResponseInterface } from '../../../../core/interfaces/loginuser-interface';
import { AlertTypeEnum } from '../../../../core/enums/alert-type-enum';
import { AlertService } from '../../../../core/components/alert/alert.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit{
  userId?: number;

  userUpdate: FormGroup<UserUpdateInterface> = new FormGroup<UserUpdateInterface>({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required])
  });

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    id && this.userService.show(parseInt(id)).subscribe((res: ApiResponseInterface<UserInterface>) => {
      this.userId = res.data.id;

      this.userUpdate.setValue({
        name: res.data.name,
        email: res.data.email
      });
    })
  }

  userUpdateCall(): void {
    if (this.userUpdate.invalid) {
      this.alertService.setAlert({
        type: AlertTypeEnum.danger,
        text: 'Please enter valid values'
      });
      return;
    }
    this.userId && this.userService.update(this.userId, this.userUpdate).subscribe();
  }
}
