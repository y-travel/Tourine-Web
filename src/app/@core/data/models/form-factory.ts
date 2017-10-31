import { Form, FormBuilder, Validators } from "@angular/forms";
import { Injectable } from "@angular/core";
//
import { FormService } from "../form.service";
import { Coupon, Tour } from "./client.model";

@Injectable()
export class FormFactory {

  createTourForm(model: Tour = new Tour()): FormService<Tour> {
    let form = new FormBuilder().group({
      destinationId: [model.destinationId, Validators.required],
      duration: [model.duration, Validators.required],
      date: [model.date, Validators.required],
      placeId: [model.placeId, Validators.required],
      isFlight: [model.isFlight],
      status: [model.status],
      adultCount: [model.adultCount, [Validators.required, Validators.min(1)]],
      adultMinPrice: [model.adultMinPrice, Validators.min(1)],
      busPrice: [model.busPrice],
      roomPrice: [model.roomPrice],
      foodPrice: [model.foodPrice],
      infantPrice: [model.infantPrice, Validators.min(1)],
    });
    return new FormService(Tour, form);
  }

  createCouponForm(model: Coupon = new Coupon()):FormService<Coupon> {
    let form = new FormBuilder().group({
      reagentId: [model.reagentId],
      passengers: [model.passengers],
      adultCount: [model.adultCount, Validators.min(1)],
      adultPrice: [model.adultPrice],
      infantCount: [model.infantCount],
      infantPrice: [model.infantPrice],
      busPrice: [model.busPrice],
      roomPrice: [model.roomPrice],
      foodPrice: [model.foodPrice]
    });
    return new FormService(Coupon, form);
  }
}
