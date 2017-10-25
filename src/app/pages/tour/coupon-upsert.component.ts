import { Component, ElementRef, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: "coppon-upsert",
    templateUrl: "coupon-upsert.component.html",
    styleUrls: ["coupon-upsert.component.scss"]
})
export class CouponUpsertComponent {
  form:FormGroup;
   message:string;
  constructor(){
    this.form=new FormBuilder().group(
      {
        Name:["",Validators.required],
        Family:["",Validators.required],
      }
    );
  }

  submit(){
    this.message=this.form.controls['Name'].value;
  }
}
