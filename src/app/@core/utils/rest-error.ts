import { ResponseStatus } from '../data/models/index';
import { Serializable } from './serializable';

export enum RestErrorType {
  Other,
  Validation
}

export class ValidationError {
  constructor(public field: string = null, public message: string = null) {
  }
}

export class RestError {
  constructor(public error: ResponseStatus, public errorType = RestErrorType.Other) {
  }

  getValidationErrors(): ValidationError[] {
    const validationErrors = new Array<ValidationError>();
    for (const error of this.error.errors) {
      validationErrors.push(Serializable.fromJSONToType(ValidationError, error));
    }
    return validationErrors;
  }
}

