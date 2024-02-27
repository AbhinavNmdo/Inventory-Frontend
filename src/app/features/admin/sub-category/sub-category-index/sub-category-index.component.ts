import { Component, OnInit } from '@angular/core';
import { DatatableInterface, DatatableReqInterface, OrderByInterface } from '../../../../core/interfaces/datatable-interface';
import { SubCategoryService } from '../../../../core/services/sub-category.service';
import { ApiResponseInterface } from '../../../../core/interfaces/loginuser-interface';

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
    }
  }

  protected subCategories?: DatatableInterface;

  constructor (
    private subCategoryService: SubCategoryService
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
    this.subCategoryService.destroy(id).subscribe();
  }

  isDescSorting(column: string): boolean {
    return this.subCategoryRequest.orderBy.column == column && this.subCategoryRequest.orderBy.order == 'desc';
  }

  isAscSorting(column: string): boolean {
    return this.subCategoryRequest.orderBy.column == column && this.subCategoryRequest.orderBy.order == 'asc';
  }

  changeOrderBy(column: string): void {
    let order = this.isDescSorting(column) ? 'asc' : 'desc';
    this.subCategoryRequest.orderBy = { column, order };
    this.getSubCategory();
  }
}
