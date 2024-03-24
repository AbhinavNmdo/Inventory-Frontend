import { Component, OnInit } from '@angular/core';
import { DatatableReqInterface, TableInterface } from '../../../../core/interfaces/datatable-interface';
import { ApiResponseInterface } from '../../../../core/interfaces/loginuser-interface';
import { ProductService } from '../../../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from '../../../../core/interfaces/product-interface';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrl: './product-show.component.css'
})
export class ProductShowComponent implements OnInit {
  id: string | null = this.route.snapshot.paramMap.get('id');
  product?: ProductInterface;
  datatable: TableInterface = {
    tableData: undefined,
    tableRequest: {
      perPage: 10,
      page: 1,
      isPaginate: true,
      searchParam: null,
      orderBy: {
        column: 'id',
        order: 'asc',
      },
      filters: [
        { column: 'product_id', value: this.id }
      ]
    },
    colDefs: [
      {
        label: 'Product No.',
        data: 'product_no',
        orderable: true
      },
      {
        label: 'Alloted to',
        data: 'user.name',
        orderable: true
      },
      {
        label: 'Email',
        data: 'user.email',
        orderable: true
      },
      {
        label: 'Is Damage',
        data: 'is_damage',
        orderable: true,
        render: (data: any) => {
          return data ? 'Yes' : 'No';
        }
      }
    ]
  };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id && this.productService.show(parseInt(this.id)).subscribe((res: ApiResponseInterface) => {
      this.product = res.data;
    });
  }

  getProduct(tableRequest: DatatableReqInterface): void {
    this.productService
      .productInfoList(tableRequest)
      .subscribe((res: ApiResponseInterface) => {
        this.datatable.tableData = res.data;
      });
  }
}
