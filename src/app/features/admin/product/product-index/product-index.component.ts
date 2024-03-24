import { Component, OnInit } from '@angular/core';
import {
  DatatableActionInterface,
  DatatableReqInterface,
  TableInterface,
} from '../../../../core/interfaces/datatable-interface';
import { ProductService } from '../../../../core/services/product.service';
import { ApiResponseInterface } from '../../../../core/interfaces/loginuser-interface';
import { ConfirmModalService } from '../../../../core/components/confirm-modal/confirm-modal.service';
import { ProductInterface } from '../../../../core/interfaces/product-interface';

@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrl: './product-index.component.css',
})
export class ProductIndexComponent implements OnInit {
  productRequest: DatatableReqInterface = {
    perPage: 10,
    page: 1,
    isPaginate: true,
    searchParam: null,
    orderBy: {
      column: 'id',
      order: 'desc',
    },
  };

  datatable: TableInterface = {
    tableData: undefined,
    tableRequest: this.productRequest,
    colDefs: [
      {
        label: 'Category',
        data: 'sub_category.category.name',
        orderable: true,
      },
      {
        label: 'Sub Category',
        data: 'sub_category.name',
        orderable: true,
      },
      {
        label: 'Name',
        data: 'name',
        orderable: true,
      },
      {
        label: 'Current Stock',
        data: 'stock',
        orderable: true,
        render: (data: any) => {
          return data * 1;
        }
      }
    ],
    actions: [
      {
        icon: 'delete',
        color: 'icon-danger',
        functionName: 'deleteProduct',
      },
      {
        icon: 'edit',
        color: 'icon-warning',
        routerLink: 'edit/:id',
      },
      {
        icon: 'visibility',
        color: 'icon-primary',
        routerLink: 'show/:id'
      }
    ],
  };

  constructor(
    private productService: ProductService,
    private confirmModalService: ConfirmModalService
  ) { }

  ngOnInit(): void { }

  getProduct(tableRequest: DatatableReqInterface): void {
    this.productService
      .index(tableRequest)
      .subscribe((res: ApiResponseInterface) => {
        this.datatable.tableData = res.data;
      });
  }

  deleteProduct(data: DatatableActionInterface<ProductInterface>): void {
    this.confirmModalService.setConfirm({
      data: data.data.id,
      title: 'Are you sure to delete this Product?',
      onConfirm: (id: number) => {
        this.productService.destroy(id).subscribe(() => {
          this.getProduct(data.tableRequest)
        });
      },
      onCancel: () => { }
    });
  }

  handleActionClick(event: { data: any; functionName: string }): void {
    (this as any)[event.functionName](event);
  }
}
