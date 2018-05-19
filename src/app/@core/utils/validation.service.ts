import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AbstractControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { Dictionary, ResponseError } from '../data/models';
import { AppUtils, UTILS } from './app-utils';

export const ValidationMessage: Dictionary<string> = {
  min: 'validation.min',
  max: 'validation.max',
  minlength: 'validation.minlength',
  maxlength: 'validation.maxlength',
  required: 'validation.required',
  pattern: 'validation.pattern',
  greaterthan: 'validation.greaterthan',
  countbiggerthan: 'validation.countbiggerthan',
  areequal: 'validation.areEqual',
};

@Injectable()
export class ValidationService {

  constructor(private translate: TranslateService, @Inject(UTILS) private utils: AppUtils) {
  }

  update(form: FormGroup, newErrors?: ResponseError[]) {

    for (const controlName in form.controls) {
      const control = form.controls[controlName];
      this.update(<any>control, newErrors);
      const errorName = (control.errors) ? Object.keys(control.errors)[0] : null;
      if (errorName) {
        let errorMessage = this.translate.instant(ValidationMessage[errorName]);

        Object.keys(control.errors[errorName]).forEach(x => {
          const key = control.errors[errorName][x];
          if (!this.utils.isNullOrUndefined(key)) {
            errorMessage = errorMessage.replace(`{{${x}}}`, this.translate.instant(key.toString()));
          }
        });
        errorMessage = errorMessage.replace('{{field}}', this.translate.instant(controlName));
        this.setErrorMessage(control, errorMessage);
      } else {
        this.setErrorMessage(control, '');
      }
    }

    if (newErrors) {
      for (const error of newErrors) {
        const control = form.controls[error.fieldName];
        if (control) {
          this.setErrorMessage(control, error.message);
        }
      }
    }
  }

  private setErrorMessage(control: AbstractControl, errorMessage: string) {
    const property = Reflect.getOwnPropertyDescriptor(control, 'errorMessage');
    if (property) {
      Reflect.set(control, 'errorMessage', errorMessage);
    } else {
      Reflect.defineProperty(control, 'errorMessage', {value: errorMessage, writable: true});
    }
  }
}

export class CustomValidations {
  static isEmptyInputValue(value: any): boolean {
    // we don't check for string here so it also works with arrays
    return value === null || value.length === 0;
  }

  static greaterThan(requiredValue: number, fieldName?: string): ValidatorFn {
    return (control: AbstractControl): Dictionary<any> => {
      return control.value <= requiredValue || isNaN(control.value) ?
        {greaterthan: {requiredValue: requiredValue, field: fieldName}}
        : null;
    };
  }

  static areEqual(field: AbstractControl, fieldName: string): ValidatorFn {
    return (control: AbstractControl): Dictionary<any> => {
      return control.value !== field.value ? {areequal: {requiredField: fieldName}} : null;
    };
  }

  static conditionalRequired(field: AbstractControl, validations: ValidatorFn[]): ValidatorFn {
    return (control: AbstractControl): Dictionary<any> => {
      if (!Validators.required(field)) {
        for (const validator of validations) {
          const res = validator(control);
          if (res) {
            return res;
          }
        }
      }
      return null;
    };
  }

  static required(fieldName?: string): ValidatorFn {
    return (control: AbstractControl): Dictionary<any> => {
      return !Validators.required(control) ? null : fieldName ? {required: {field: fieldName}} : {required: {}};
    };
  }

  static lessThan(requiredValue: number): ValidatorFn {
    return (control: AbstractControl): Dictionary<any> => {
      return control.value >= requiredValue || isNaN(control.value) ? {lessthan: {requiredValue: requiredValue}} : null;
    };
  }

  static countBiggerThan(requiredValue: number, fieldName?: string): ValidatorFn {
    return (control: AbstractControl): Dictionary<any> => {
      return (control.value && control.value instanceof Array && control.value.length > requiredValue) ?
        null : (
          fieldName ? {countbiggerthan: {requiredValue: requiredValue, field: fieldName}}
            : {countbiggerthan: {requiredValue: requiredValue}});
    };
  }
}
