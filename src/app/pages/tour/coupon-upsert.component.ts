import { Component, Inject } from "@angular/core";

import { FormService } from "../../@core/data/form.service";
import { Coupon, Customer } from "../../@core/data/models/client.model";
import { ModalInterface } from "../../@theme/components/modal.interface";
import { ReagentUpsertComponent } from "./reagent-upsert.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DialogService } from "../../@core/utils/dialog.service";
import { FormFactory } from "../../@core/data/models/form-factory";

@Component({
  moduleId: module.id,
  selector: "coppon-upsert",
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
              private formFactory: FormFactory) {
    this.customer = formFactory.createCustomerForm();
  }

  save() {

  }

  show() {
  }

  reagentUpsert() {
    this.dialogService.open(ReagentUpsertComponent, null/*@TODO*/);

  }
}
