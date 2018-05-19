/* tslint:disable */
import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'button[trnButton]',
  host: {
    '[class.btn]': 'true',
    '[class.btn-primary]': 'kind===\'primary\'',
    '[class.col]': 'kind ===\'primary\'&&size ===\'large\'',
    '[class.btn-micro]': 'isMicro()'
  }
})
export class TrnButtonDirective {
  @Input() size: buttonSize = 'large';
  @Input() kind: buttonType = 'primary';

  isMicro() {
    return this.size === 'micro';
  }
}

export type buttonSize = 'micro' | 'mini' | 'large' ;
export type buttonType = 'secondary' | 'primary' ;
