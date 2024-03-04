import { Component, OnInit } from '@angular/core';
import {
  DatatableReqInterface,
  TableInterface,
} from '../../../../core/interfaces/datatable-interface';
import { CategoryService } from '../../../../core/services/category.service';
import { SubCategoryService } from '../../../../core/services/sub-category.service';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryInterface } from '../../../../core/interfaces/category-interface';
import { SubCategoryInterface } from '../../../../core/interfaces/sub-category-interface';
import { ApiResponseInterface } from '../../../../core/interfaces/loginuser-interface';

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
    ],
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  getProduct(tableRequest: DatatableReqInterface): void {
    this.productService
      .index(tableRequest)
      .subscribe((res: ApiResponseInterface) => {
        this.datatable.tableData = res.data;
      });
  }

  handleActionClick(event: { data: any; functionName: string }): void {
    (this as any)[event.functionName](event);
  }
}
