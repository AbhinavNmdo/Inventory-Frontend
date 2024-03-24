import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchaseInterface } from '../../../../core/interfaces/purchase-interface';
import { PurchaseService } from '../../../../core/services/purchase.service';
import { ApiResponseInterface } from '../../../../core/interfaces/loginuser-interface';

@Component({
  selector: 'app-purchase-show',
  templateUrl: './purchase-show.component.html',
  styleUrl: './purchase-show.component.css'
})
export class PurchaseShowComponent implements OnInit {
  id: string | null = this.route.snapshot.paramMap.get('id');
  purchase?: PurchaseInterface;

  constructor(
    private route: ActivatedRoute,
    private purchaseService: PurchaseService
  ) { }

  ngOnInit(): void {
    this.id && this.purchaseService.show(this.id).subscribe((res: ApiResponseInterface) => {
      this.purchase = res.data;
    });
  }
}
