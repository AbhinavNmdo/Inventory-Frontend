import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryInterface, CategoryUpdateInterface } from '../../../../core/interfaces/category-interface';
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

  category?: CategoryInterface;

  updateCategory: FormGroup<CategoryUpdateInterface> = new FormGroup<CategoryUpdateInterface>({
    name: new FormControl(null, [Validators.required])
  });

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    id && this.categoryService.show(parseInt(id)).subscribe((res: ApiResponseInterface) => {
      this.category = res.data;
      this.updateCategory.setValue({
        name: res.data.name
      })
    });

  }

  updateCategoryCall(): void {
    if (this.updateCategory.invalid) {
      this.alertService.setAlert({
        type: AlertTypeEnum.danger,
        text: 'Please enter valid values in the form.'
      });
      return;
    }
    this.category && this.categoryService.update(this.category?.id, this.updateCategory).subscribe();
  }
}
