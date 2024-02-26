import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryStore } from '../../../../core/interfaces/category-interface';
import { CategoryService } from '../../../../core/services/category.service';
import { IApiResponce } from '../../../../core/interfaces/login';
import { Router } from '@angular/router';
import { AlertTypeEnum } from '../../../../core/enums/alert-type-enum';
import { AlertService } from '../../../../core/components/alert/alert.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent {

  storeCategory = new FormGroup<CategoryStore>({
    categories: new FormArray<FormGroup>([
      new FormGroup({
        name: new FormControl(null, [Validators.required])
      })
    ])
  });

  constructor (
    private categoryService: CategoryService,
    private alertService: AlertService
  ) {}

  addCategory()
  {
    const name = new FormGroup<any>({
      name: new FormControl(null, [Validators.required])
    });
    (<FormArray>this.storeCategory.get('categories'))?.push(name);
  }

  removeCategory(index:number)
  {
    (<FormArray>this.storeCategory.get('categories')).removeAt(index);
  }

  get categoryControls()
  {
    return (<FormArray>this.storeCategory.get('categories')).controls;
  }

  storeCategoryCall()
  {
    if (this.storeCategory.invalid) {
      this.alertService.setAlert({
        type: AlertTypeEnum.danger,
        text: 'Please enter valid values.'
      });
      return;
    }
    this.categoryService.store(this.storeCategory.value).subscribe((res:IApiResponce) => {})
  }
}
