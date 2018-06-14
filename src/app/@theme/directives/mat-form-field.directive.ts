import { AfterViewInit, ContentChild, Directive } from '@angular/core';
import { MaskedInputDirective } from 'angular2-text-mask';
import { CustomTextMask } from '../../@core/utils/custom-text-mask';

@Directive({
  selector: 'mat-form-field'
})
export class MatFormFieldDirective implements AfterViewInit {
  @ContentChild(MaskedInputDirective) textMaskDirective: MaskedInputDirective;

  ngAfterViewInit() {
    if (this.textMaskDirective == null) {
      return;
    }
    new CustomTextMask(this.textMaskDirective)
      .setMask(this.textMaskDirective.textMaskConfig);
  }
}
