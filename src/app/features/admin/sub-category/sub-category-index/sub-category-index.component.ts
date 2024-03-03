import { Component, OnInit } from '@angular/core';
import { DatatableInterface, DatatableReqInterface, OrderByInterface } from '../../../../core/interfaces/datatable-interface';
import { SubCategoryService } from '../../../../core/services/sub-category.service';
import { ApiResponseInterface } from '../../../../core/interfaces/loginuser-interface';
import { ConfirmModalService } from '../../../../core/components/confirm-modal/confirm-modal.service';

@Component({
  selector: 'app-sub-category-index',
  templateUrl: './sub-category-index.component.html',
  styleUrl: './sub-category-index.component.css'
})
export class SubCategoryIndexComponent implements OnInit {

  protected subCategoryRequest: DatatableReqInterface = {
    perPage: 10,
    page: 1,
    searchParam: null,
    orderBy: <OrderByInterface>{
      column: 'id',
      order: 'desc'
    },
    isPaginate: true
  }

  protected subCategories?: DatatableInterface;

  constructor (
    private subCategoryService: SubCategoryService,
    private confirmModalService: ConfirmModalService
  ) {}

  ngOnInit(): void {
    this.getSubCategory();
  }

  getSubCategory(): void {
    this.subCategoryService.index(this.subCategoryRequest).subscribe((res: ApiResponseInterface) => {
      this.subCategories = res.data;
    });
  }

  deleteSubCategory(id: number): void {
    this.confirmModalService.setConfirm({
      data: id,
      title: 'Are you sure to delete this sub-category?',
      onConfirm: () => {
        this.subCategoryService.destroy(id).subscribe();
      },
      onCancel: () => {}
    })
  }

  changeOrderBy(column: string, order: string): void {
    this.subCategoryRequest.orderBy = { column, order };
    this.getSubCategory();
  }
}
