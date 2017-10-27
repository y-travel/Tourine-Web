import { Component, ElementRef, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: "reagent-upsert",
    templateUrl: "reagent-upsert.component.html",
    styleUrls: ["reagent-upsert.component.scss"]
})
export class ReagentUpsertComponent {
  form:FormGroup;
   message:string;
  constructor(){
    this.form=new FormBuilder().group(
      {
        ManagerName:["",Validators.required],
        AgencyName:["",Validators.required],
        Phone:["",Validators.required],
        CellPhone:["",Validators.required],
        Email:["",Validators.required],

      }
    );
  }

  submit(){
    this.message=this.form.controls['Name'].value;
  }
}
