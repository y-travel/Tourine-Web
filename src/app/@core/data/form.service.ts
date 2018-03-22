import { OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Serializable, TypeConstructor } from '../utils/serializable';

export class FormService<T> implements OnDestroy {
  subsciptionList = [];
  model: T;

  constructor(model: TypeConstructor<T>, public form: FormGroup) {
    this.model = new model();
    //@TODO fill model from form
    this.init();
  }

  init() {
    this.onValueChanges(this.form.value);
    this.subsciptionList.push(
      this.form.valueChanges.subscribe(data => this.onValueChanges(data))
    );
  }

  updateForm(model: any = this.model) {
    this.form.patchValue(model);
  }

  ngOnDestroy() {
    while (this.subsciptionList.length > 0)
      this.subsciptionList.pop().unsubscribe();
  }

  markTouch(control: AbstractControl = this.form) {
    control.markAsTouched({onlySelf: true});
  }

  markAllFieldAsTouch(controls = this.form.controls) {
    if (!controls)
      return;
    Object.keys(controls).forEach(x => {
      this.markTouch(controls[x]);
      const formGroup = <FormGroup>controls[x];
      if (formGroup && formGroup.controls)
        this.markAllFieldAsTouch(formGroup.controls);
    });
  }

  private onValueChanges(data: any) {
    Serializable.fromJSON(this.model, data);
  }
}
