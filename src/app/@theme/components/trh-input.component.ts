import { Directive } from "@angular/core";

@Directive({
  selector: "input[trh-input]",
  host:{
    "class":"form-control"
  }
})
export class TrhInputComponent {

}
