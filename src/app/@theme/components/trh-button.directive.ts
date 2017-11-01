import { Directive, Input } from "@angular/core";

@Directive({
  selector: "button[trhButton]",
  host: {
    "[class.btn]": "true",
    "[class.btn-primary]": "kind==='primary'",
    "[class.col]": "kind ==='primary'&&size ==='large'",
    "[class.btn-micro]": "isMicro()",
    "[class.btn-outline-warning]": "isMicro()"
  }
})
export class TrhButtonDirective {
  @Input() size: buttonSize = "large";
  @Input() kind: buttonType = "primary";

  isMicro() {
    return this.size === 'micro';
  }
}

export type buttonSize = "micro" | "mini" | "large" ;
export type buttonType = "secondary" | "primary" ;
