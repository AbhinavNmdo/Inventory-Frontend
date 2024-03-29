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
    sub_category_id: number,
    name: string,
    stock: number
}

export interface ProductStoreInterface {
    categoryId: FormControl<number | null>,
    subCategoryId: FormControl<number | null>,
    products: FormArray<FormGroup<{
        name: FormControl<string | null>,
        stock: FormControl<number | null>
    }>>
}

export interface ProductUpdateInterface {
    categoryId: FormControl<number | null>,
    subCategoryId: FormControl<number | null>,
    name: FormControl<string | null>,
}

export interface ProductInfoInterface {
    id: number,
    product_no: string,
    product_id: number,
    is_damage: boolean,
    product: {
        id: number,
        name: string
    },
    user?: {
        id: number,
        name: string,
        email: string
    }
}

