import { FormArray, FormControl, FormGroup } from "@angular/forms"

export interface ProductInterface {
    id: number,
    sub_category?: {
        id: number,
        category_id: number,
        name: string,
        category?: {
            id: number,
            name: string
        }
    },
    name: string,
    stock: number
}

export interface ProductStoreInterface {
    categoryId: FormControl<number>,
    subCategoryId: FormControl<number>,
    products: FormArray<FormGroup<{
        name: FormControl<string>,
        stock: FormControl<number>
    }>>
}

export interface ProductUpdateInterface {
    categoryId: FormControl<number>,
    subCategoryId: FormControl<number>,
    name: FormControl<string>,
    stock: FormControl<number>
}

