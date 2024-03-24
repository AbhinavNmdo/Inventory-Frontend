import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllotmentLogStore } from '../../../../core/interfaces/allotment-log-interface';
import { AllotmentLogService } from '../../../../core/services/allotment-log.service';
import { ProductService } from '../../../../core/services/product.service';
import { UserService } from '../../../../core/services/user.service';
import { UserInterface } from '../../../../core/interfaces/user-interface';
import { ApiResponseInterface } from '../../../../core/interfaces/loginuser-interface';
import { ProductInfoInterface } from '../../../../core/interfaces/product-interface';
import { AlertService } from '../../../../core/components/alert/alert.service';
import { AlertTypeEnum } from '../../../../core/enums/alert-type-enum';

@Component({
  selector: 'app-allotment-allot',
  templateUrl: './allotment-allot.component.html',
  styleUrl: './allotment-allot.component.css'
})
export class AllotmentAllotComponent implements OnInit {
  users?: UserInterface[] = [];
  productInfos: ProductInfoInterface[] = [];
  allotProduct: FormGroup<AllotmentLogStore> = new FormGroup<AllotmentLogStore>({
    allotmentDate: new FormControl(new Date().toISOString().substring(0, 10), [Validators.required]),
    productInfoId: new FormControl('', [Validators.required]),
    userId: new FormControl('', [Validators.required]),
    remark: new FormControl(null)
  });

  constructor(
    private allotmentLogService: AllotmentLogService,
    private productService: ProductService,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.userService.index({
      isPaginate: false,
      orderBy: {
        column: 'name',
        order: 'desc'
      }
    }).subscribe((res: ApiResponseInterface) => {
      this.users = res.data;
    });

    this.productService.productInfoList().subscribe((res: ApiResponseInterface) => {
      this.productInfos = res.data;
    });
  }

  allotProductCall(): void {
    if (this.allotProduct.invalid) {
      this.alertService.setAlert({
        type: AlertTypeEnum.danger,
        text: 'Please fill all the fields'
      });
      return;
    }
    this.allotmentLogService.allotProduct(this.allotProduct).subscribe();
  }
}
