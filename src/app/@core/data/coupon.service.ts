import { Injectable } from "@angular/core";
//
import { ApiService } from "./api.service";
import { Coupon } from "./models/client.model";

@Injectable()
export class CouponService {
  data = [];

  constructor(private apiService: ApiService) {
  }

  addCoupon(model: Coupon) {
    //@TODO refactor
    this.data.push(model);
  }
}
