import { Component, ElementRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { FormService } from "../../@core/data/form.service";
import { FormFactory } from "../../@core/data/models/form-factory";
import { Coupon, Customer } from "../../@core/data/models/client.model";
import { ModalInterface } from "../../@theme/components/modal.interface";
import { ReagentUpsertComponent } from "./reagent-upsert.component";

@Component({
  moduleId: module.id,
  selector: "coppon-upsert",
  templateUrl: "coupon-upsert.component.html",
  styleUrls: ["coupon-upsert.component.scss"]
})
export class CouponUpsertComponent implements ModalInterface {
  coupon: FormService<Coupon>;
  customer: FormService<Customer>;
  reagents = [];
  passengers: Array<FormService<Customer>> = [];

  constructor(public formFactory: FormFactory, private modalService: NgbModal) {
    this.coupon = formFactory.createCouponForm();
    this.customer = formFactory.createCustomerForm();
  }

  save() {

  }

  show() {
  }

  reagentUpsert() {
    let ref = this.modalService.open(ReagentUpsertComponent, {size: "sm", backdrop: "static", container: "trh-layout"});
    ref.componentInstance.show();
  }
}
