import { ControlValueAccessor } from '@angular/forms';
//
export const noop = () => {
};

export class TrnEditControlBase  implements ControlValueAccessor {
  protected onTouchedCallBack: () => void = noop;
  protected onChangeCallBack: (_: any) => void = noop;

  get value(): any {
    return this.innervalue;
  }

  set value(v: any) {
    if (v !== this.innervalue) {
      this.innervalue = v;
      this.onChangeCallBack(v);
    }
  }

  private innervalue: any = '';


  //-------  ControlValueAccessor interface
  writeValue(value: any): void {
    if (value !== this.innervalue) {
      this.innervalue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallBack = fn;
  }

  registerOnTouched(fn): void {
    this.onTouchedCallBack = fn;
  }

  //---------- ControlValueAccessor interface
}
