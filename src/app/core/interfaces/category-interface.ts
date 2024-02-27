import { FormArray, FormControl, FormGroup } from "@angular/forms";

export interface CategoryInterface {
    id: number,
    name: string
}

export interface CategoryStoreInterface {
    categories: FormArray<FormGroup<CategoryUpdateInterface>>
}

export interface CategoryUpdateInterface {
    name: FormControl<string|null>
}