import { Component, ElementRef, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormService } from "../../@core/data/form.service";
import { FormFactory } from "../../@core/data/models/form-factory";
import { Coupon, Customer } from "../../@core/data/models/client.model";
import { LocalDataSource } from "ng2-smart-table";
import { ModalInterface } from "../../@theme/components/modal.interface";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
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
    let ref = this.modalService.open(ReagentUpsertComponent, {size: "sm", backdrop: "static", container: "nb-layout"});
    ref.componentInstance.show();
  }
}
