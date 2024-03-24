import { Component, OnInit } from '@angular/core';
import { DatatableReqInterface, TableInterface } from '../../../../core/interfaces/datatable-interface';
import { ApiResponseInterface } from '../../../../core/interfaces/loginuser-interface';
import { AllotmentLogService } from '../../../../core/services/allotment-log.service';

@Component({
  selector: 'app-allotment-index',
  templateUrl: './allotment-index.component.html',
  styleUrl: './allotment-index.component.css'
})
export class AllotmentIndexComponent implements OnInit {
  datatable: TableInterface = {
    tableRequest: {
      perPage: 10,
      page: 1,
      isPaginate: true,
      orderBy: {
        column: 'id',
        order: 'desc'
      }
    },
    tableData: undefined,
    colDefs: [
      {
        label: 'Name',
        data: 'user.name',
        orderable: true
      },
      {
        label: 'Email',
        data: 'user.email',
        orderable: true
      },
      {
        label: 'Product',
        data: 'product_info.product.name',
        orderable: true
      },
      {
        label: 'Product No.',
        data: 'product_info.product_no',
        orderable: true
      },
      {
        label: 'Allotment',
        data: 'allotment_date',
        orderable: true
      },
      {
        label: 'Return',
        data: 'return_date',
        orderable: true,
        render: (data: string) => {
          return !data ? '-:-' : data;
        }
      },
      {
        label: 'Is Damage',
        data: 'is_damage',
        orderable: false,
        render: (data: string) => {
          return data ? 'Yes' : 'No';
        }
      }
    ],
    actions: [
      {
        icon: 'keyboard_return',
        color: 'icon-warning',
        routerLink: 'return/:id',
        hideIf: (data: any) => {
          return data.return_date != null;
        }
      }
    ]
  }

  constructor (
    private allotmentLogService: AllotmentLogService
  ) {}

  ngOnInit(): void {
  }

  getAllotments(requestParam: DatatableReqInterface): void {
    this.allotmentLogService.index(requestParam).subscribe((res: ApiResponseInterface) => {
      this.datatable.tableData = res.data;
    });
  }

  handleActionClick(event: any): void {
    (this as any)[event.functionName](event);
  }
}
