import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductStoreInterface } from '../../../../core/interfaces/product-interface';
import { CategoryInterface } from '../../../../core/interfaces/category-interface';
import { SubCategoryInterface } from '../../../../core/interfaces/sub-category-interface';
import { CategoryService } from '../../../../core/services/category.service';
import { SubCategoryService } from '../../../../core/services/sub-category.service';
import { ProductService } from '../../../../core/services/product.service';
import { ApiResponseInterface } from '../../../../core/interfaces/loginuser-interface';
import { AlertService } from '../../../../core/components/alert/alert.service';
import { AlertTypeEnum } from '../../../../core/enums/alert-type-enum';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit{
  categories?: CategoryInterface[];
  subCategories?: SubCategoryInterface[];

  productStore: FormGroup<ProductStoreInterface> = new FormGroup<ProductStoreInterface>({
    categoryId: new FormControl(null, [Validators.required]),
    subCategoryId: new FormControl(null, [Validators.required]),
    products: new FormArray<FormGroup>([
      new FormGroup({
        name: new FormControl(null, [Validators.required]),
        stock: new FormControl(null, [Validators.required])
      })
    ])
  });

  constructor (
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
        order: 'desc'
      }
    }).subscribe((res: ApiResponseInterface) => {
      this.categories = res.data;
    });
  }

  loadSubCategory(categoryId: string): void {
    this.subCategoryService.index({
      isPaginate: false,
      filters: [
        {column: 'category_id', value: categoryId}
      ],
      orderBy: {
        column: 'name',
        order: 'asc'
      }
    }).subscribe((res: ApiResponseInterface) => {
      this.subCategories = res.data;
    })
  }

  get products() {
    return (<FormArray>this.productStore.get('products')).controls;
  }

  addProduct(): void {
    (<FormArray>this.productStore.get('products')).push(new FormGroup({
      name: new FormControl(null, [Validators.required]),
      stock: new FormControl(null, [Validators.required])
    }));
  }

  removeProduct(index: number): void {
    (<FormArray>this.productStore.get('products')).removeAt(index);
  }

  productStoreCall(): void {
    if (this.productStore.invalid) {
      console.log(this.productStore.value)
      this.alertService.setAlert({
        type: AlertTypeEnum.danger,
        text: 'Please enter valid values.'
      });
      return;
    }
    this.productService.store(this.productStore).subscribe();
  }
}
