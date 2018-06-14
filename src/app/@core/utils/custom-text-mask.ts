import { createNumberMask } from 'text-mask-addons/dist/textMaskAddons';
import { MaskedInputDirective } from 'angular2-text-mask';

const MASKTYPES = {
  'number': undefined,
  'mobile': undefined,
  'money': undefined,
};

declare type MaskType = keyof typeof MASKTYPES;

function isInMaskType(type: string): type is MaskType {
  return MASKTYPES.hasOwnProperty(type);
}

// @TODO clear output mask not implemented yet
export class CustomTextMask {
  constructor(private textMaskDirective: MaskedInputDirective) {
  }

  setMask(maskType: any) {
    if (!isInMaskType(maskType)) {
      throw new Error('mask type is not exist');
    }
    let mask = {};
    switch (<MaskType>maskType) {
      case 'number':
        mask = createNumberMask({
          prefix: '',
          includeThousandsSeparator: false
        });
        break;
      case 'mobile':
        mask = [/[0]/, /[9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
        break;
      case 'money':
        mask = createNumberMask({
          prefix: '',
        });
        break;
    }
    const config = Object.freeze({
      mask: mask,
    });
    this.refreshMask(config);
  }

  private refreshMask(config) {
    this.textMaskDirective.textMaskConfig = config;
    this.textMaskDirective.ngOnChanges(null);
  }
}
