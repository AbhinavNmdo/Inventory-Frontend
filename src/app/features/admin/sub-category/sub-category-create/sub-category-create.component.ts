import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SubCategoryStoreInterface, SubCategoryUpdateInterface } from '../../../../core/interfaces/sub-category-interface';
import { SubCategoryService } from '../../../../core/services/sub-category.service';
import { CategoryService } from '../../../../core/services/category.service';
import { CategoryInterface } from '../../../../core/interfaces/category-interface';
import { DatatableReqInterface, OrderByInterface } from '../../../../core/interfaces/datatable-interface';
import { ApiResponseInterface } from '../../../../core/interfaces/loginuser-interface';

@Component({
  selector: 'app-sub-category-create',
  templateUrl: './sub-category-create.component.html',
  styleUrl: './sub-category-create.component.css'
})
export class SubCategoryCreateComponent implements OnInit {

  protected categories?: CategoryInterface[];
  protected categoryRequest: DatatableReqInterface = {
    isPaginate: false,
    orderBy: <OrderByInterface>{
      column: 'name',
      order: 'asc'
    }
  };

  constructor (
    private subCategoryService: SubCategoryService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.index(this.categoryRequest).subscribe((res: ApiResponseInterface<CategoryInterface[]>) => {
      this.categories = res.data;
    });
  }

  storeSubCategory = new FormGroup<SubCategoryStoreInterface>({
    categoryId: new FormControl(null, [Validators.required]),
    subCategories: new FormArray<FormGroup>([
      new FormGroup({
        name: new FormControl(null, [Validators.required])
      })
    ])
  });

  storeSubCategoryCall(): void {
    this.subCategoryService.store(this.storeSubCategory).subscribe();
  }

  addSubCategory(): void {
    const subCategory = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });

    (<FormArray>this.storeSubCategory.get('subCategories')).push(subCategory);
  }

  removeSubCategory(index: number): void {
    (<FormArray>this.storeSubCategory.get('subCategories')).removeAt(index);
  }

  get subCategoryControls() {
    return (<FormArray>this.storeSubCategory.get('subCategories')).controls;
  }

}
