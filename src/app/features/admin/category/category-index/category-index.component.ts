import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../core/services/category.service';
import { DatatableInterface, DatatableReqInterface, OrderByInterface } from '../../../../core/interfaces/datatable-interface';
import { ApiResponseInterface } from '../../../../core/interfaces/loginuser-interface';
import { ConfirmModalService } from '../../../../core/components/confirm-modal/confirm-modal.service';

@Component({
  selector: 'app-category-index',
  templateUrl: './category-index.component.html',
  styleUrl: './category-index.component.css'
})
export class CategoryIndexComponent implements OnInit {

  public categoryRequest: DatatableReqInterface = {
    perPage: 10,
    page: 1,
    searchParam: null,
    orderBy: <OrderByInterface>{
      column: 'id',
      order: 'desc'
    }
  }

  protected categories?: DatatableInterface;

  constructor(
    private categoryService: CategoryService,
    private confirmModalService: ConfirmModalService
  ) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    this.categoryService.index(this.categoryRequest).subscribe((res: ApiResponseInterface) => {
      this.categories = res.data;
    });
  }

  deleteCategory(id: number): void {
    this.confirmModalService.setConfirm({
      data: id,
      title: 'Are you sure to delete this category?',
      onConfirm: (id: number) => {
        this.categoryService.destory(id).subscribe((res: ApiResponseInterface) => {
          this.getCategory();
        });
      },
      onCancel: () => { }
    });
  }

  changeOrderBy(column: string, order: string): void {
    this.categoryRequest.orderBy = { column, order };
    this.getCategory();
  }
}
