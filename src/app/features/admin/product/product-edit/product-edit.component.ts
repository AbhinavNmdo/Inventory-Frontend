import { Component, OnInit } from '@angular/core';
import { CategoryInterface } from '../../../../core/interfaces/category-interface';
import { SubCategoryInterface } from '../../../../core/interfaces/sub-category-interface';
import { CategoryService } from '../../../../core/services/category.service';
import { SubCategoryService } from '../../../../core/services/sub-category.service';
import { ProductService } from '../../../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductInterface, ProductUpdateInterface } from '../../../../core/interfaces/product-interface';
import { ApiResponseInterface } from '../../../../core/interfaces/loginuser-interface';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent implements OnInit {
  categories?: CategoryInterface[];
  subCategories?: SubCategoryInterface[];
  productId?: number | null;

  productUpdate: FormGroup<ProductUpdateInterface> = new FormGroup<ProductUpdateInterface>({
    categoryId: new FormControl(null, [Validators.required]),
    subCategoryId: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
  })

  constructor(
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productId = id ? parseInt(id) : null;

    this.categoryService.index({
      isPaginate: false,
      orderBy: {
        column: 'name',
        order: 'asc'
      }
    }).subscribe((res: ApiResponseInterface) => {
      this.categories = res.data;
    })

    id && this.productService.show(parseInt(id)).subscribe((res: ApiResponseInterface<ProductInterface>) => {
      this.subCategoryService.index({
        isPaginate: false,
        orderBy: {
          column: 'name',
          order: 'asc'
        },
        filters: [
          {column: 'category_id', value: res.data.sub_category?.category?.id ?? null}
        ]
      }).subscribe((res: ApiResponseInterface) => {
        this.subCategories = res.data;
      });

      this.productUpdate.setValue({
        categoryId: res.data.sub_category?.category_id ?? null,
        subCategoryId: res.data.sub_category_id,
        name: res.data.name,
      });
    })
  }

  productUpdateCall(): void {
    this.productId && this.productService.update(this.productId, this.productUpdate).subscribe();
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
}
