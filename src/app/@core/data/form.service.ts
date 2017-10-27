import { Injectable, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Tour } from "./models";
import { Serializable } from "../utils/serializable";

@Injectable()
export class FormService implements OnDestroy {

  subsciptionList = [];
  model: any;
  form: FormGroup;

  static CreateTourForm(model: Tour = new Tour()): FormGroup {
    return new FormBuilder().group({
      destinationId: [model.id, Validators.required],
      duration: [model.duration, Validators.required],
      date: [model.date, Validators.required],
      placeId: [model.placeId, Validators.required],
      type: [model.type],
      status: [model.status],
      adultCount: [model.adultCount, [Validators.required, Validators.min(1)]],
      adultMinPrice: [model.adultMinPrice, Validators.min(1)],
      busPrice: [model.busPrice],
      roomPrice: [model.roomPrice],
      foodPrice: [model.foodPrice],
      infantPrice: [model.infantPrice, Validators.min(1)],
    });
  }

  constructor() {

  }

  init(form: FormGroup, model: any) {
    this.form = form;
    this.model = model;
    this.subsciptionList.push(
      form.valueChanges.subscribe(data => this.onValueChanges(data))
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
