import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface UserInterface {
  id: number;
  name: string;
  email: string;
}

export interface UserStoreInterface {
  users: FormArray<
    FormGroup<{
      name: FormControl<string | null>;
      email: FormControl<string | null>;
    }>
  >;
}

export interface UserUpdateInterface {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
}
