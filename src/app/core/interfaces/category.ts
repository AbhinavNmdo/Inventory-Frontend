import { FormArray, FormControl, FormGroup } from "@angular/forms";

export interface CategoryInterface {
    id: number,
    name: string
}

export interface CategoryIndex {
    searchParam: string|null,
    orderBy: Array<string>
}

export interface CategoryStore {
    categories: FormArray<FormGroup<CategoryUpdate>>
}

export interface CategoryUpdate {
    name: FormControl<string|null>
}