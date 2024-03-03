import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubCategoryService } from '../../../../core/services/sub-category.service';
import { SubCategoryInterface, SubCategoryUpdateInterface } from '../../../../core/interfaces/sub-category-interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../core/components/alert/alert.service';
import { AlertTypeEnum } from '../../../../core/enums/alert-type-enum';
import { CategoryInterface } from '../../../../core/interfaces/category-interface';
import { CategoryService } from '../../../../core/services/category.service';
import { ApiResponseInterface } from '../../../../core/interfaces/loginuser-interface';

@Component({
  selector: 'app-sub-category-edit',
  templateUrl: './sub-category-edit.component.html',
  styleUrl: './sub-category-edit.component.css'
})
export class SubCategoryEditComponent implements OnInit {

  categories?: CategoryInterface[];
  subCategory?: SubCategoryInterface;

  updateSubCategory: FormGroup<SubCategoryUpdateInterface> = new FormGroup<SubCategoryUpdateInterface>({
    categoryId: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required])
  });

  constructor (
    private activatedRoute: ActivatedRoute,
    private subCategoryService: SubCategoryService,
    private categoryService: CategoryService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    id && this.subCategoryService.show(parseInt(id)).subscribe((res: ApiResponseInterface<SubCategoryInterface>) => {
      this.subCategory = res.data;
      this.updateSubCategory.setValue({
        categoryId: res.data.category_id,
        name: res.data.name
      });
    });

    this.categoryService.index({
      isPaginate: false,
      orderBy: {
        column: 'name',
        order: 'asc'
      }
    }).subscribe((res: ApiResponseInterface) => {
      this.categories = res.data;
    });
  }

  updateSubCategoryCall(): void {
    if (this.updateSubCategory.invalid) {
      this.alertService.setAlert({
        type: AlertTypeEnum.danger,
        text: 'Please enter valid inputs.'
      });
      return;
    }
    this.subCategory && this.subCategoryService.update(this.subCategory?.id, this.updateSubCategory).subscribe();
  }

}
