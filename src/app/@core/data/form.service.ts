import { OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Serializable, TypeConstructor } from "../utils/serializable";

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

  private onValueChanges(data: any) {
    Serializable.fromJSON(this.model, data);
  }
}
