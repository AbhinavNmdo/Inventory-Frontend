import { FormControl } from "@angular/forms"

export interface AllotmentLogInterface {
    id: number,
    user_id: number,
    product_id: number,
    allotment_date: string | null,
    return_date: string | null,
    is_damage: boolean,
    remark: string | null
}

export interface AllotmentLogStore {
    userId: FormControl<string | null>,
    productInfoId: FormControl<string | null>,
    allotmentDate: FormControl<string | null>,
    remark: FormControl<string | null>
}

export interface AllotmentLogReturn {
    returnDate: FormControl<string | null>,
    isDamage: FormControl<boolean | null>
}