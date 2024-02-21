import { FormControl } from "@angular/forms";

export interface ILoginUser {
    username: FormControl<string|null>,
    password: FormControl<string|null>
}

export interface IApiResponce {
    status: number,
    message: string|null,
    data: Array<any>|null
}