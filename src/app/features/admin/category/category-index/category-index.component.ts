import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../core/services/category.service';
import { IDatableReq, OrderByInterface } from '../../../../core/interfaces/datatable.interface';
import { IApiResponce } from '../../../../core/interfaces/login';
import { ConfirmModalService } from '../../../../core/components/confirm-modal/confirm-modal.service';

@Component({
  selector: 'app-category-index',
  templateUrl: './category-index.component.html',
  styleUrl: './category-index.component.css'
})
export class CategoryIndexComponent implements OnInit {

  categoryRequest: IDatableReq = {
    perPage: 10,
    page: 1,
    searchParam: null,
    orderBy: <OrderByInterface>{
      column: 'id',
      order: 'desc'
    }
  }

  protected categories: any;

  constructor(
    private categoryService: CategoryService,
    private confirmModalService: ConfirmModalService
  ) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    this.categoryService.index(this.categoryRequest).subscribe((res: IApiResponce) => {
      this.categories = res.data;
    });
  }

  deleteCategory(id: number): void {
    this.confirmModalService.setConfirm({
      data: id,
      title: 'Are you sure to delete this category?',
      onConfirm: (id: number) => {
        this.categoryService.destory(id).subscribe((res: IApiResponce) => {
          this.getCategory();
        });
      },
      onCancel: () => { }
    });
  }

  isDescSorting(column: string): boolean {
    return this.categoryRequest.orderBy.column == column && this.categoryRequest.orderBy.order == 'desc';
  }

  isAscSorting(column: string): boolean {
    return this.categoryRequest.orderBy.column == column && this.categoryRequest.orderBy.order == 'asc';
  }

  changeOrderBy(column: string): void {
    let order = this.isDescSorting(column) ? 'asc' : 'desc';
    this.categoryRequest.orderBy = { column, order };
    this.getCategory();
  }
}
