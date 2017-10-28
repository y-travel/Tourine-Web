import { Component, Input } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: "form-field",
  templateUrl: "form-field.component.html",
  styleUrls: ["form-field.component.scss"],
  host:{
    "class":"col"
  }
})
export class FormFieldComponent {
  @Input() label:string;
}
