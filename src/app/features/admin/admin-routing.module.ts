import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryIndexComponent } from './category/category-index/category-index.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { SubCategoryIndexComponent } from './sub-category/sub-category-index/sub-category-index.component';
import { SubCategoryCreateComponent } from './sub-category/sub-category-create/sub-category-create.component';
import { SubCategoryEditComponent } from './sub-category/sub-category-edit/sub-category-edit.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'category', children: [
    {path: '', component: CategoryIndexComponent},
    {path: 'create', component: CategoryCreateComponent},
    {path: 'edit/:id', component: CategoryEditComponent}
  ]},
  {path: 'sub-category', children: [
    {path: '', component: SubCategoryIndexComponent},
    {path: 'create', component: SubCategoryCreateComponent},
    {path: 'edit/:id', component: SubCategoryEditComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
