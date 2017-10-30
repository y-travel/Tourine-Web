import { Component, forwardRef, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

import { TrhEditControlBase } from "../trh-edit-control-base";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

export const customSliderControlValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TrhSliderComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: "trh-slider",
  templateUrl: "trh-slider.component.html",
  styleUrls: ["trh-slider.component.scss"],
  providers: [customSliderControlValueAccessor]
})
export class TrhSliderComponent extends TrhEditControlBase {
  @Input() trueText: string;
  @Input() falseText: string;

  constructor(private translateService: TranslateService) {
    super();
  }
}
