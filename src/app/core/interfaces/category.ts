import { FormArray, FormControl } from "@angular/forms";

export interface CategoryIndex {
    searchParam: string|null,
    orderBy: Array<string>
}

export interface CategoryStore {
    categories: FormArray<FormControl>
}

export interface CategoryUpdate {
    name: FormControl<string|null>
}