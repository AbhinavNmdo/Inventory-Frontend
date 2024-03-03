import { Component } from '@angular/core';
import { TableInterface } from '../../../../core/interfaces/datatable-interface';

@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrl: './product-index.component.css'
})
export class ProductIndexComponent {

  datatable?: TableInterface;

  constructor () {}

}
