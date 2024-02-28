import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SubCategoryStoreInterface, SubCategoryUpdateInterface } from '../../../../core/interfaces/sub-category-interface';

@Component({
  selector: 'app-sub-category-create',
  templateUrl: './sub-category-create.component.html',
  styleUrl: './sub-category-create.component.css'
})
export class SubCategoryCreateComponent {

  storeSubCategory = new FormGroup<SubCategoryStoreInterface>({
    subCategories: new FormArray<FormGroup<SubCategoryUpdateInterface>>([
      new FormGroup<SubCategoryUpdateInterface>({
        category_id: new FormControl(null, [Validators.required]),
        name: new FormControl(null, [Validators.required])
      })
    ])
  });

}
