import { Directive, AfterViewInit, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Directive({
  selector: "input[trh-input]",
  host: {
    "class": "form-control",
    "[placeholder]": "placeholder"
  }
})
export class TrhInputComponent {

  _placeholder = "";
  @Input()
  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    if (value)
      value = this.translateService.instant(value);
    this._placeholder = value;
  }

  constructor(private translateService: TranslateService) {
  }

}
