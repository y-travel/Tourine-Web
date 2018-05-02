import { AfterContentInit, ContentChildren, Directive, HostListener, QueryList } from '@angular/core';
import { MatFormFieldControl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[autoTranslate]',

})
export class AutoTranslateDirective implements AfterContentInit {
  @ContentChildren(MatFormFieldControl, {descendants: true}) inputs: QueryList<MatFormFieldControl<any>>;
  @HostListener('attr.formGroup') formGroup: any;

  constructor(private translateService: TranslateService) {
  }

  ngAfterContentInit(): void {
    console.log(this.formGroup);
    if (this.inputs)
      this.inputs.forEach(item => {
        if (!item.placeholder || typeof item.placeholder !== 'string')
          return;
        (<any>item).placeholder = this.translateService.instant(item.placeholder);
      });
  }

}
