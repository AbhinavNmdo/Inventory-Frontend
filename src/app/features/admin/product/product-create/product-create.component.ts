import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductStoreInterface } from '../../../../core/interfaces/product-interface';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {
  productStore: FormGroup<ProductStoreInterface> = new FormGroup<ProductStoreInterface>({
    categoryId: new FormControl(null, [Validators.required]),
    subCategoryId: new FormControl(null, [Validators.required]),
    products: new FormArray<FormGroup>([
      new FormGroup({
        name: new FormControl(null, [Validators.required]),
        stock: new FormControl(null, [Validators.required])
      })
    ])
  })
}
