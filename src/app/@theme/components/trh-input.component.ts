import { Directive, AfterViewInit, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Directive({
  selector: "input[trh-input]",
  host: {
    "class": "form-control",
    "[placeholder]": "placeholder"
  }
})
export class TrhInputComponent implements AfterViewInit {

  @Input() placeholder = "";

  constructor(private translateService: TranslateService) {
  }

  ngAfterViewInit() {
    if (this.placeholder !== "")
      this.placeholder = this.translateService.instant(this.placeholder);
  }
}
