import { ResponseStatus } from "../data/models/index";
import { Serializable } from "./serializable";

export class ValidationError {
  constructor(public field: string = null, public message: string = null) {
  }
}

export class RestError {
  constructor(public error: ResponseStatus, public errorType = RestErrorType.Other) {
  }

  getValidationErrors(): ValidationError[] {
    let validationErrors = new Array<ValidationError>();
    for (let error of this.error.errors) {
      validationErrors.push(Serializable.fromJSONToType(ValidationError, error));
    }
    return validationErrors;
  }
}

export enum RestErrorType {
  Other,
  Validation
}
