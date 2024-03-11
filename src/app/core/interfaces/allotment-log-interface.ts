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
    userId: FormControl<string>,
    productInfoId: FormControl<string>,
    allotmentDate: FormControl<Date>,
    remark: FormControl<string>
}

export interface AllotmentLogReturn {
    returnDate: FormControl<Date>,
    isDamage: boolean
}