import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[trhRow]',
  host: {
    "fxLayout": "'column'"
  }
})
export class TrhRowDirective {
  // @HostBinding("attr.fxLayout") @Input("fxLayout") layout = "column";

  constructor() {
  }

}
