import { AfterContentInit, ContentChildren, Directive, QueryList } from '@angular/core';
import { MatFormFieldControl } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";

@Directive({
  selector: '[autoTranslate]',

})
export class AutoTranslateDirective implements AfterContentInit {
  @ContentChildren(MatFormFieldControl, {descendants: true}) inputs: QueryList<MatFormFieldControl<any>>;

  constructor(private translateService: TranslateService) {
  }

  ngAfterContentInit(): void {
    if (this.inputs)
      this.inputs.forEach(item => {
        (<any>item).placeholder = this.translateService.instant(item.placeholder);
      });
  }

}
