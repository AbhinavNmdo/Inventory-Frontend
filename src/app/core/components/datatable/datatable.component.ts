import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatatableReqInterface, TableInterface } from '../../interfaces/datatable-interface';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.css'
})
export class DatatableComponent implements OnInit {

  @Output() actionClick = new EventEmitter<any>();
  @Output() refreshData = new EventEmitter<any>();

  @Input() datatable?: TableInterface;

  ngOnInit(): void {
    this.refreshDataCall();
  }

  isDescSorting(column: string): boolean {
    return this.datatable?.tableRequest.orderBy.column == column && this.datatable?.tableRequest.orderBy.order == 'desc';
  }

  isAscSorting(column: string): boolean {
    return this.datatable?.tableRequest.orderBy.column == column && this.datatable?.tableRequest.orderBy.order == 'asc';
  }

  changeOrderBy(column: string): void {
    let order = this.isDescSorting(column) ? 'asc' : 'desc';
    if (this.datatable) {
      this.datatable.tableRequest.orderBy = { column, order };
    }
    this.refreshDataCall();
  }

  refreshDataCall(): void {
    this.refreshData.emit(this.datatable?.tableRequest);
  }
}
