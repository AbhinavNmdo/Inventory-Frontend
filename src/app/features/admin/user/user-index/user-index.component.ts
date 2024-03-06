import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../../../../core/interfaces/user-interface';
import { UserService } from '../../../../core/services/user.service';
import { ConfirmModalService } from '../../../../core/components/confirm-modal/confirm-modal.service';
import { DatatableActionInterface, DatatableReqInterface, TableInterface } from '../../../../core/interfaces/datatable-interface';
import { ApiResponseInterface } from '../../../../core/interfaces/loginuser-interface';
import { ProductInterface } from '../../../../core/interfaces/product-interface';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrl: './user-index.component.css',
})
export class UserIndexComponent implements OnInit {
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
        data: 'name',
        orderable: true
      },
      {
        label: 'Email',
        data: 'email',
        orderable: true
      }
    ],
    actions: [
      {
        icon: 'delete',
        color: 'icon-danger',
        functionName: 'deleteUser'
      },
      {
        icon: 'edit',
        color: 'icon-warning',
        routerLink: 'edit/:id'
      }
    ]
  }

  constructor(
    private userService: UserService,
    private confirmModalService: ConfirmModalService
  ) {}

  ngOnInit(): void {
  }

  getUser(requestParam: DatatableReqInterface): void {
    this.userService.index(requestParam).subscribe((res: ApiResponseInterface) => {
      this.datatable.tableData = res.data;
    });
  }

  deleteUser(event: DatatableActionInterface<ProductInterface>): void {
    this.confirmModalService.setConfirm({
      data: event.data.id,
      title: 'Are you sure to delete this user?',
      onConfirm: (id: number) => {
        this.userService.destory(id).subscribe(() => {
          this.getUser(event.tableRequest);
        });
      },
      onCancel: () => {}
    })
  }

  handleActionClick(event: any): void {
    (this as any)[event.functionName](event);
  }
}
