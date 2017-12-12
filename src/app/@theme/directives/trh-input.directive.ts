import { Directive, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MatFormFieldControl } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "input[trhInput]",
  host: {
    "class": "form-control mat-input-element",
    "[placeholder]": "placeholder"
  }
})
export class TrhInputDirective implements MatFormFieldControl<any> {
  value: any | any;
  stateChanges: Observable<void>;
  id: string;
  ngControl: NgControl | any;
  focused: boolean;
  empty: boolean;
  shouldPlaceholderFloat: boolean;
  required: boolean;
  disabled: boolean;
  errorState: boolean;
  controlType: string;

  constructor(private translateService: TranslateService) {
  }

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

  setDescribedByIds(ids: string[]): void {
  }

  onContainerClick(event: MouseEvent): void {
  }

}
