import { Directive } from "@angular/core";

@Directive({
  selector: "input[trh-button]",
  host:{
    "class":"btn btn-primary"
  }
})
export class TrhButtonComponent {

}
