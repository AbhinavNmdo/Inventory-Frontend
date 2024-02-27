import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryUpdateInterface } from '../../../../core/interfaces/category-interface';
import { CategoryService } from '../../../../core/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { ApiResponseInterface } from '../../../../core/interfaces/loginuser-interface';
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
    this.updateCategory = new FormGroup<CategoryUpdateInterface>({
      name: new FormControl(this.category?.name, [Validators.required])
    });

    const id = this.route.snapshot.paramMap.get('id');
    id && this.categoryService.show(parseInt(id)).subscribe((res: ApiResponseInterface) => {
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
    this.categoryService.update(this.category.id, this.updateCategory).subscribe((res: ApiResponseInterface) => { });
  }
}
