import { Component, Inject } from "@angular/core";

import { FormService } from "../../@core/data/form.service";
import { Coupon, Customer } from "../../@core/data/models/client.model";
import { ModalInterface } from "../../@theme/components/modal.interface";
import { ReagentUpsertComponent } from "./reagent-upsert.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DialogService } from "../../@core/utils/dialog.service";
import { FormFactory } from "../../@core/data/models/form-factory";
import { CouponService } from "../../@core/data/coupon.service";

@Component({
  moduleId: module.id,
  selector: "coupon-upsert",
  templateUrl: "coupon-upsert.component.html",
  styleUrls: ["coupon-upsert.component.scss"]
})
export class CouponUpsertComponent implements ModalInterface {
  customer: FormService<Customer>;
  reagents = [];
  passengers: Array<FormService<Customer>> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Coupon>,
              public dialogInstance: MatDialogRef<ModalInterface>,
              private dialogService: DialogService,
              public formFactory: FormFactory,
              private couponService: CouponService) {
    this.customer = formFactory.createCustomerForm();
  }

  save() {
    //@TODO Impl. validation
    const model = this.data.model;
    this.couponService.addCoupon(model);
    this.dialogInstance.close(model);
  }

  show() {
  }

  reagentUpsert() {
    const ref = this.dialogService.open(ReagentUpsertComponent, null);
    ref.afterClosed().subscribe(model => this.reagents.push(model));
  }
}
