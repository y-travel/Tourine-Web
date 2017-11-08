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
        managerName:["",Validators.required],
        agencyName:["",Validators.required],
        cellPhone:["",Validators.required],
        phone:["",Validators.required],
        email:["",Validators.required],
      }
    );
  }

  save(){
    //this.message=this.form.controls['Name'].value;
    alert("OK");
  }
}
