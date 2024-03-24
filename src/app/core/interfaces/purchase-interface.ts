import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ProductInterface } from './product-interface';

export interface PurchaseInterface {
  id: number;
  vendor: string;
  bill_no: string;
  total_amt: number;
  purchase_info?: PurchaseInfo[];
}

export interface PurchaseStoreInterface {
  vendor: FormControl<string | null>;
  billNo: FormControl<string | null>;
  purchases: FormArray<FormGroup<{
    productId: FormControl<number | null>;
    amount: FormControl<number | null>;
    quantity: FormControl<number | null>;
  }>>;
  totalAmt: FormControl<number | null>;
}

export interface PurchaseInfo {
  id: number;
  purchase_id: number;
  product_id: number;
  quantity: number;
  amount: number;
  product?: ProductInterface;
}