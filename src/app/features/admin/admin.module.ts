import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarLinksComponent } from '../../core/components/navbar-links/navbar-links.component';
import { CategoryIndexComponent } from './category/category-index/category-index.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '../../core/components/alert/alert.component';
import { AlertClassPipe } from '../../core/components/alert/alert-class.pipe';
import { AlertService } from '../../core/components/alert/alert.service';
import { AlertTypeEnum } from '../../core/enums/alert-type-enum';
import { ConfirmModalComponent } from '../../core/components/confirm-modal/confirm-modal.component';
import { SubCategoryIndexComponent } from './sub-category/sub-category-index/sub-category-index.component';
import { SubCategoryCreateComponent } from './sub-category/sub-category-create/sub-category-create.component';
import { SubCategoryEditComponent } from './sub-category/sub-category-edit/sub-category-edit.component';
import { TableSortingButtonComponent } from '../../core/components/table-sorting-button/table-sorting-button.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    NavbarLinksComponent,
    CategoryIndexComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    AlertComponent,
    AlertClassPipe,
    ConfirmModalComponent,
    SubCategoryIndexComponent,
    SubCategoryCreateComponent,
    SubCategoryEditComponent,
    TableSortingButtonComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminModule {
  constructor (
    public alertService: AlertService
  ) {}

  showAlert(type: AlertTypeEnum, text: string)
  {
    this.alertService.setAlert({
      type: type,
      text: text
    });
  }
}
