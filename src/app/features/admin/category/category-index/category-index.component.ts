import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../../core/services/category.service';
import { DatatableInterface, DatatableReqInterface, OrderByInterface, TableInterface } from '../../../../core/interfaces/datatable-interface';
import { ApiResponseInterface } from '../../../../core/interfaces/loginuser-interface';
import { ConfirmModalService } from '../../../../core/components/confirm-modal/confirm-modal.service';
import { CategoryInterface } from '../../../../core/interfaces/category-interface';
import { Observable, Subject, of } from 'rxjs';

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
    },
    isPaginate: true
  }

  datatable: TableInterface = {
    tableData: undefined,
    tableRequest: this.categoryRequest,
    colDefs: [
      {
        label: 'Name',
        data: 'name',
        orderable: true
      }
    ],
    actions: [
      {
        icon: 'delete',
        color: 'icon-danger',
        functionName: 'deleteCategory'
      },
      {
        icon: 'edit',
        color: 'icon-warning',
        routerLink: 'edit/:id'
      }
    ]
  }

  constructor(
    private categoryService: CategoryService,
    private confirmModalService: ConfirmModalService
  ) { }

  ngOnInit(): void {
  }

  public getCategory(requestParam: DatatableReqInterface): void {
    this.categoryService.index(requestParam).subscribe((res: ApiResponseInterface) => {
      this.datatable.tableData = res.data;
    });
  }

  deleteCategory(data: any): void {
    this.confirmModalService.setConfirm({
      data: data.data.id,
      title: 'Are you sure to delete this category?',
      onConfirm: (id: number) => {
        this.categoryService.destory(id).subscribe(() => {
          this.getCategory(data.tableRequest);
        });
      },
      onCancel: () => { }
    });
  }

  handleActionClick(event: any): void {
    (this as any)[event.functionName](event);
  }
}
