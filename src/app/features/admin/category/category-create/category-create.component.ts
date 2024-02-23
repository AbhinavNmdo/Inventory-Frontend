import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryStore } from '../../../../core/interfaces/category';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent {

  storeCategory = new FormGroup<CategoryStore>({
    categories: new FormArray<FormControl>([])
  })
  constructor (
  ) {}

  addCategory()
  {
    const name = new FormControl(null, [Validators.required]);
    (<FormArray>this.storeCategory.get('categories'))?.push(name);
  }
}
