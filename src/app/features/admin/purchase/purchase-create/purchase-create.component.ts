import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PurchaseStoreInterface } from '../../../../core/interfaces/purchase-interface';
import { PurchaseService } from '../../../../core/services/purchase.service';
import { AlertService } from '../../../../core/components/alert/alert.service';
import { AlertTypeEnum } from '../../../../core/enums/alert-type-enum';
import { CategoryInterface } from '../../../../core/interfaces/category-interface';
import { CategoryService } from '../../../../core/services/category.service';
import { SubCategoryService } from '../../../../core/services/sub-category.service';
import { ApiResponseInterface } from '../../../../core/interfaces/loginuser-interface';
import { SubCategoryInterface } from '../../../../core/interfaces/sub-category-interface';
import { ProductInterface } from '../../../../core/interfaces/product-interface';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-purchase-create',
  templateUrl: './purchase-create.component.html',
  styleUrl: './purchase-create.component.css'
})
export class PurchaseCreateComponent implements OnInit {
  categories?: CategoryInterface[];
  subCategories: Array<SubCategoryInterface[]> = [[]];
  products: Array<ProductInterface[]> = [[]];
  vendorNames?: string[];

  purchaseStore: FormGroup<PurchaseStoreInterface> = new FormGroup<PurchaseStoreInterface>({
    vendor: new FormControl(null, [Validators.required]),
    billNo: new FormControl(null, [Validators.required]),
    purchases: new FormArray<FormGroup>([
      new FormGroup({
        productId: new FormControl('', [Validators.required]),
        quantity: new FormControl(null, [Validators.required]),
        amount: new FormControl(null, [Validators.required])
      })
    ]),
    totalAmt: new FormControl(null, [Validators.required])
  });

  constructor(
    private purchaseService: PurchaseService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private productService: ProductService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.categoryService.index({
      isPaginate: false,
      orderBy: {
        column: 'name',
        order: 'asc'
      }
    }).subscribe((res: ApiResponseInterface) => {
      this.categories = res.data;
    });

    this.purchaseService.getVendorNameList().subscribe((res: ApiResponseInterface) => {
      this.vendorNames = res.data;
    });
  }

  purchaseStoreCall(): void {
    console.log(this.purchaseStore.value);
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
      productId: new FormControl('', [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required])
    }));

    this.subCategories?.push([])
    this.products?.push([])
  }

  removePurchase(index: number): void {
    (<FormArray>this.purchaseStore.get('purchases')).removeAt(index);
    this.subCategories.splice(index, 1);
    this.products.splice(index, 1);
  }

  getSubCategories(index: number, categoryId: string): void {
    this.subCategoryService.index({
      isPaginate: false,
      orderBy: {
        column: 'name',
        order: 'asc'
      },
      filters: [
        {column: 'category_id', value: categoryId}
      ]
    }).subscribe((res: ApiResponseInterface) => {
      this.subCategories?.splice(index, 1, res.data);
    });
  }

  getProducts(index: number, subCategoryId: string): void {
    this.productService.index({
      isPaginate: false,
      orderBy: {
        column: 'name',
        order: 'asc'
      },
      filters: [
        {column: 'sub_category_id', value: subCategoryId}
      ]
    }).subscribe((res: ApiResponseInterface) => {
      this.products.splice(index, 1, res.data);
    });
  }

  calculateTotal(): void {
    let total: number = 0;
    (<FormArray>this.purchaseStore.get('purchases')).controls.map((ele) => {
      total += ele.value.amount;
    });
    this.purchaseStore.get('totalAmt')?.setValue(total);
  }
}
