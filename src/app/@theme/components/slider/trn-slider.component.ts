/* tslint:disable */
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { TrnEditControlBase } from '../trn-edit-control-base';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const customSliderControlValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TrnSliderComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'trn-slider',
  templateUrl: 'trn-slider.component.html',
  styleUrls: ['trn-slider.component.scss'],
  providers: [customSliderControlValueAccessor]
})
export class TrnSliderComponent extends TrnEditControlBase {
  @Input() trueText: string;
  @Input() falseText: string;
  @Output() change = new EventEmitter<any>();

  constructor(private translateService: TranslateService) {
    super();
  }
}
