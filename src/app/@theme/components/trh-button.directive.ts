import { Directive } from "@angular/core";

@Directive({
  selector: "button[trhButton]",
  host: {
    "class": "btn btn-primary col"
  }
})
export class TrhButtonDirective {

}
