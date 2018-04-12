import { EventEmitter, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Serializable, TypeConstructor } from '../utils/serializable';
import { ValidationService } from '../utils/validation.service';

/**
 * @deprecated use NewFormService instead
 * @returns {any}
 */
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

export class NewFormService<T> extends FormGroup implements OnDestroy {
  subsciptionList = [];
  oldModel: T;
  onModelChanges = new EventEmitter();

  constructor(model: TypeConstructor<T>, form: FormGroup, public validation: ValidationService) {
    super(form.controls);
    this.oldModel = new model();
    this.init();
  }

  init() {
    this.onValueChanges(this.value);
    this.subsciptionList.push(
      this.valueChanges.subscribe(data => this.onValueChanges(data))
    );
  }

  updateForm(model: any) {
    this.patchValue(model);
  }

  ngOnDestroy() {
    while (this.subsciptionList.length > 0)
      this.subsciptionList.pop().unsubscribe();
  }

  markTouch(control: AbstractControl = this) {
    control.markAsTouched({onlySelf: true});
  }

  markAllFieldAsTouch(controls = this.controls) {
    if (!controls)
      return;
    Object.keys(controls).forEach(x => {
      this.markTouch(controls[x]);
      const formGroup = <FormGroup>controls[x];
      if (formGroup && formGroup.controls)
        this.markAllFieldAsTouch(formGroup.controls);
    });
  }

  validate() {
    if (this.valid)
      return true;
    this.markAllFieldAsTouch();
    return false;
  }

  private onValueChanges(data: any) {
    this.onModelChanges.emit(data);
    this.validation.update(this);
  }
}
