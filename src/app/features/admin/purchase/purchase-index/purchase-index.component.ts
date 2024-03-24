import { Component } from '@angular/core';
import {
  DatatableReqInterface,
  TableInterface,
} from '../../../../core/interfaces/datatable-interface';
import { PurchaseService } from '../../../../core/services/purchase.service';
import { ApiResponseInterface } from '../../../../core/interfaces/loginuser-interface';

@Component({
  selector: 'app-purchase-index',
  templateUrl: './purchase-index.component.html',
  styleUrl: './purchase-index.component.css',
})
export class PurchaseIndexComponent {
  datatable: TableInterface = {
    tableRequest: {
      perPage: 10,
      page: 1,
      isPaginate: true,
      orderBy: {
        column: 'id',
        order: 'desc',
      },
    },
    tableData: undefined,
    colDefs: [
      {
        label: 'Vendor',
        data: 'vendor',
        orderable: true,
      },
      {
        label: 'Bill NO',
        data: 'bill_no',
        orderable: true,
      },
      {
        label: 'Amount',
        data: 'total_amt',
        orderable: true,
      },
    ],
    actions: [
      {
        icon: 'visibility',
        color: 'icon-primary',
        routerLink: 'show/:id'
      }
    ]
  };

  constructor(private purchaseService: PurchaseService) {}

  getPurchase(tableRequest: DatatableReqInterface): void {
    this.purchaseService
      .index(tableRequest)
      .subscribe((res: ApiResponseInterface) => {
        this.datatable.tableData = res.data;
      });
  }
}
