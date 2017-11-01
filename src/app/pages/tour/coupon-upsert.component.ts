import { Component, ElementRef, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormService } from "../../@core/data/form.service";
import { FormFactory } from "../../@core/data/models/form-factory";
import { Coupon } from "../../@core/data/models/client.model";

@Component({
  moduleId: module.id,
  selector: "coppon-upsert",
  templateUrl: "coupon-upsert.component.html",
  styleUrls: ["coupon-upsert.component.scss"]
})
export class CouponUpsertComponent {
  form: FormService<Coupon>;
  reagents = [];
  passengers = [];

  constructor(formFactory:FormFactory) {
    this.form = formFactory.createCouponForm();
  }

  save() {
  }
}
