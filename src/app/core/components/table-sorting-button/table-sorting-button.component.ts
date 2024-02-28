import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderByInterface } from '../../interfaces/datatable-interface';

@Component({
  selector: 'app-table-sorting-button',
  templateUrl: './table-sorting-button.component.html',
  styleUrl: './table-sorting-button.component.css'
})
export class TableSortingButtonComponent implements OnInit {

  @Input() label: string = '';
  @Input() columnName: string = '';
  @Input() orderByObj: OrderByInterface = {
    column: '',
    order: ''
  };
  @Output() refreshOrderBy = new EventEmitter<any>();

  ngOnInit(): void {

  }

  isDescSorting(column: string): boolean {
    return this.orderByObj.column == column && this.orderByObj.order == 'desc';
  }

  isAscSorting(column: string): boolean {
    return this.orderByObj.column == column && this.orderByObj.order == 'asc';
  }

  changeOrderBy(column: string): void {
    let order = this.isDescSorting(column) ? 'asc' : 'desc';
    this.orderByObj = { column, order };
    this.refreshOrderBy.emit(this.orderByObj);
  }
}
