import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PurchaseStoreInterface } from '../../../../core/interfaces/purchase-interface';
import { PurchaseService } from '../../../../core/services/purchase.service';
import { AlertService } from '../../../../core/components/alert/alert.service';
import { AlertTypeEnum } from '../../../../core/enums/alert-type-enum';

@Component({
  selector: 'app-purchase-create',
  templateUrl: './purchase-create.component.html',
  styleUrl: './purchase-create.component.css'
})
export class PurchaseCreateComponent {
  purchaseStore: FormGroup<PurchaseStoreInterface> = new FormGroup<PurchaseStoreInterface>({
    vendor: new FormControl(null, [Validators.required]),
    billNo: new FormControl(null, [Validators.required]),
    purchases: new FormArray<FormGroup>([
      new FormGroup({
        productId: new FormControl(null, [Validators.required]),
        quantity: new FormControl(null, [Validators.required]),
        amount: new FormControl(null, [Validators.required])
      })
    ]),
    totalAmt: new FormControl(null, [Validators.required])
  });

  constructor(
    private purchaseService: PurchaseService,
    private alertService: AlertService
  ) {}

  purchaseStoreCall(): void {
    if (this.purchaseStore.invalid) {
      this.alertService.setAlert({
        type: AlertTypeEnum.danger,
        text: 'Please enter valid values'
      });
      return;
    }
    this.purchaseService.store(this.purchaseStore).subscribe();
  }

  get purchaseControls() {
    return (<FormArray>this.purchaseStore.get('purchases')).controls;
  }

  addPurchase(): void {
    (<FormArray>this.purchaseStore.get('purchases')).push(new FormGroup({
      productId: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required])
    }));
  }

  removePurchase(index: number): void {
    (<FormArray>this.purchaseStore.get('purchases')).removeAt(index);
  }
}
