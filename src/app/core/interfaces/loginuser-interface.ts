import { FormControl } from "@angular/forms";

export interface LoginUserInterface {
    username: FormControl<string|null>,
    password: FormControl<string|null>
}

export interface ApiResponseInterface {
    status: number,
    msg: string|null,
    data: any
}