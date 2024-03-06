import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserStoreInterface } from '../../../../core/interfaces/user-interface';
import { UserService } from '../../../../core/services/user.service';
import { ConfirmModalService } from '../../../../core/components/confirm-modal/confirm-modal.service';
import { AlertService } from '../../../../core/components/alert/alert.service';
import { AlertTypeEnum } from '../../../../core/enums/alert-type-enum';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
})
export class UserCreateComponent {
  userStore: FormGroup<UserStoreInterface> = new FormGroup<UserStoreInterface>({
    users: new FormArray<FormGroup>([
      new FormGroup({
        name: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required]),
      }),
    ]),
  });

  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) {}

  userStoreCall(): void {
    if (this.userStore.invalid) {
      this.alertService.setAlert({
        type: AlertTypeEnum.danger,
        text: 'Please enter valid values'
      });
      return;
    }
    this.userService.store(this.userStore).subscribe();
  }

  get userControls() {
    return (<FormArray>this.userStore.get('users')).controls;
  }

  addUser(): void {
    (<FormArray>this.userStore.get('users')).push(
      new FormGroup({
        name: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required]),
      })
    );
  }

  removeUser(index: number): void {
    (<FormArray>this.userStore.get('users')).removeAt(index);
  }
}
