import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryUpdate } from '../../../../core/interfaces/category';
import { CategoryService } from '../../../../core/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { IApiResponce } from '../../../../core/interfaces/login';
import { AlertService } from '../../../../core/components/alert/alert.service';
import { AlertTypeEnum } from '../../../../core/enums/alert-type-enum';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css'
})
export class CategoryEditComponent implements OnInit {

  category: any;
  updateCategory: any;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.updateCategory = new FormGroup<CategoryUpdate>({
      name: new FormControl(this.category?.name, [Validators.required])
    });

    const id = this.route.snapshot.paramMap.get('id');
    id && this.categoryService.show(id).subscribe((res: IApiResponce) => {
      this.category = res.data;
      this.updateCategory.setValue({
        name: this.category?.name
      })
    });

  }

  updateCategoryCall() {
    if (this.updateCategory.invalid) {
      this.alertService.setAlert({
        type: AlertTypeEnum.danger,
        text: 'Please enter valid values in the form.'
      });
      return;
    }
    this.categoryService.update(this.category.id, this.updateCategory?.value).subscribe((res: IApiResponce) => { });
  }
}
