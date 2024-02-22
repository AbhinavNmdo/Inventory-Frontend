import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryIndexComponent } from './category/category-index/category-index.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'category', children: [
    {path: '', component: CategoryIndexComponent},
    {path: 'create', component: CategoryCreateComponent},
    {path: 'edit', component: CategoryEditComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
