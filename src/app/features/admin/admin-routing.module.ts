import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryIndexComponent } from './category/category-index/category-index.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { SubCategoryIndexComponent } from './sub-category/sub-category-index/sub-category-index.component';
import { SubCategoryCreateComponent } from './sub-category/sub-category-create/sub-category-create.component';
import { SubCategoryEditComponent } from './sub-category/sub-category-edit/sub-category-edit.component';
import { ProductIndexComponent } from './product/product-index/product-index.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { UserIndexComponent } from './user/user-index/user-index.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user', children: [
    {path: '', component: UserIndexComponent},
    {path: 'create', component: UserCreateComponent},
    {path: 'edit/:id', component: UserEditComponent}
  ]},
  {path: 'category', children: [
    {path: '', component: CategoryIndexComponent},
    {path: 'create', component: CategoryCreateComponent},
    {path: 'edit/:id', component: CategoryEditComponent}
  ]},
  {path: 'sub-category', children: [
    {path: '', component: SubCategoryIndexComponent},
    {path: 'create', component: SubCategoryCreateComponent},
    {path: 'edit/:id', component: SubCategoryEditComponent}
  ]},
  {path: 'product', children: [
    {path: '', component: ProductIndexComponent},
    {path: 'create', component: ProductCreateComponent},
    {path: 'edit/:id', component: ProductEditComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
