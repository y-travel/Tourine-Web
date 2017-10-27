import { Component, ElementRef, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormService } from "../../@core/data/form.service";

@Component({
    moduleId: module.id,
    selector: "coppon-upsert",
    templateUrl: "coupon-upsert.component.html",
    styleUrls: ["coupon-upsert.component.scss"]
})
export class CouponUpsertComponent {
  form:FormGroup;
  constructor(){
    this.form=FormService.CreateTourForm();
  }

  submit(){
  }
}
