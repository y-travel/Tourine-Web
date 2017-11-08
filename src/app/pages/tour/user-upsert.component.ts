import { Component, ElementRef, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  moduleId: module.id,
    selector: "user-upsert",
    templateUrl: "user-upsert.component.html",
    styleUrls: ["user-upsert.component.scss"]
})
export class UserUpsertComponent {
  form:FormGroup;
   message:string;
  constructor(){
    this.form=new FormBuilder().group(
      {
        cellphone:["",Validators.required],
        name:["",Validators.required],
        userName:["",Validators.required],
        password:["",Validators.required],
        rePassword:["",Validators.required],
      }
    );
  }

  save(){
    //this.message=this.form.controls['Name'].value;
    alert("OK");
  }
}
