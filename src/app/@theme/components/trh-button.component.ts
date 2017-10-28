import { Directive } from "@angular/core";

@Directive({
  selector: "button[trh-button]",
  host: {
    "class": "btn btn-primary col"
  }
})
export class TrhButtonComponent {

}
