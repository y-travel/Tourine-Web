import { Component, ElementRef, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormService } from "../../@core/data/form.service";
import { FormFactory } from "../../@core/data/models/form-factory";
import { Coupon, Customer } from "../../@core/data/models/client.model";
import { LocalDataSource } from "ng2-smart-table";
import { ModalInterface } from "../../@theme/components/modal.interface";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ReagentUpsertComponent } from "./reagent-upsert.component";
import { modelGroupProvider } from "@angular/forms/src/directives/ng_model_group";
import { CouponService } from "../../@core/data/coupon.service";

@Component({
  moduleId: module.id,
  selector: "coupon-upsert",
  templateUrl: "coupon-upsert.component.html",
  styleUrls: ["coupon-upsert.component.scss"]
})
export class CouponUpsertComponent implements ModalInterface {
  coupon: FormService<Coupon>;
  customer: FormService<Customer>;
  reagents = [];
  passengers: Array<FormService<Customer>> = [];

  constructor(public formFactory: FormFactory, private modalService: NgbModal, private modalInstance: NgbActiveModal, private couponService: CouponService) {
    this.coupon = formFactory.createCouponForm();
    this.customer = formFactory.createCustomerForm();
  }

  save() {
    //@TODO Impl. validation
    const model = this.coupon.model;
    this.couponService.addCoupon(model);
    this.modalInstance.close(model);
  }

  show() {
  }

  reagentUpsert() {
    let ref = this.modalService.open(ReagentUpsertComponent, {size: "lg", backdrop: "static", container: "coupon-upsert"});
    ref.componentInstance.show();
    ref.result.then(model => this.reagents.push(model));
  }
}
