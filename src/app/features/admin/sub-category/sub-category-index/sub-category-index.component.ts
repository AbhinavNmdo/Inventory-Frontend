import { Component, OnInit } from '@angular/core';
import { DatatableReqInterface, OrderByInterface, TableInterface } from '../../../../core/interfaces/datatable-interface';
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

  datatable: TableInterface = {
    tableData: undefined,
    tableRequest: this.subCategoryRequest,
    colDefs: [
      {
        label: 'Category',
        data: 'category.name',
        orderable: true,
      },
      {
        label: 'Name',
        data: 'name',
        orderable: true,
      }
    ],
    actions: [
      {
        icon: 'delete',
        color: 'icon-danger',
        functionName: 'deleteSubCategory'
      },
      {
        icon: 'edit',
        color: 'icon-warning',
        routerLink: 'edit/:id'
      }
    ]
  }

  constructor (
    private subCategoryService: SubCategoryService,
    private confirmModalService: ConfirmModalService
  ) {}

  ngOnInit(): void {
  }

  getSubCategory(requestParam: DatatableReqInterface): void {
    this.subCategoryService.index(requestParam).subscribe((res: ApiResponseInterface) => {
      this.datatable.tableData = res.data;
    });
  }

  deleteSubCategory(data: any): void {
    console.log(data);
    this.confirmModalService.setConfirm({
      data: data.data.id,
      title: 'Are you sure to delete this sub-category?',
      onConfirm: (id: number) => {
        this.subCategoryService.destroy(id).subscribe(() => {
          this.getSubCategory(data.tableRequest);
        });
      },
      onCancel: () => {}
    })
  }

  handleActionClick(event: any): void {
    (this as any)[event.functionName](event);
  }
}
