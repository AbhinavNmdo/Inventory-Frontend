import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ProductInterface } from './product-interface';

export interface PurchaseInterface {
  id: number;
  product_id: number;
  vendor: string;
  bill_no: string;
  amount: number;
  product?: ProductInterface;
}

export interface PurchaseStoreInterface {
  vendor: FormControl<string | null>;
  billNo: FormControl<string | null>;
  purchases: FormArray<FormGroup<{
    productId: FormControl<number | null>;
    amount: FormControl<number | null>;
    quantity: FormControl<number | null>;
  }>>;
  totalAmt: FormControl<number|null>;
}
