import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllotmentLogReturn } from '../../../../core/interfaces/allotment-log-interface';
import { AlertService } from '../../../../core/components/alert/alert.service';
import { AlertTypeEnum } from '../../../../core/enums/alert-type-enum';
import { AllotmentLogService } from '../../../../core/services/allotment-log.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-allotment-return',
  templateUrl: './allotment-return.component.html',
  styleUrl: './allotment-return.component.css'
})
export class AllotmentReturnComponent implements OnInit {
  id?: string | null;
  returnProduct: FormGroup<AllotmentLogReturn> = new FormGroup<AllotmentLogReturn>({
    returnDate: new FormControl(new Date().toISOString().substring(0, 10), [Validators.required]),
    isDamage: new FormControl(false, [Validators.required])
  });

  constructor(
    private allotmentLogService: AllotmentLogService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  returnProductCall(): void {
    if (this.returnProduct.invalid) {
      this.alertService.setAlert({
        type: AlertTypeEnum.danger,
        text: 'Please enter all the fields'
      });
      return;
    }
    this.id && this.allotmentLogService.returnProduct(this.id, this.returnProduct).subscribe();
  }
}
