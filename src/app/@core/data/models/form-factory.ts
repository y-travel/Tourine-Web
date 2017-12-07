import { FormBuilder, Validators } from "@angular/forms";
import { Injectable } from "@angular/core";
//
import { FormService } from "../form.service";
import { Coupon, Customer, Reagent, Tour, EditPassword } from "./client.model";

@Injectable()
export class FormFactory {

  createTourForm(model: Tour = new Tour()): FormService<Tour> {
    const form = new FormBuilder().group({
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

  createCouponForm(model: Coupon = new Coupon()): FormService<Coupon> {
    const form = new FormBuilder().group({
      reagentId: [model.reagentId, Validators.required],
      passengers: [model.passengers, Validators.required],
      adultCount: [model.adultCount, [Validators.required, Validators.min(1)]],
      adultPrice: [model.adultPrice],
      infantCount: [model.infantCount],
      infantPrice: [model.infantPrice],
      busPrice: [model.busPrice],
      roomPrice: [model.roomPrice],
      foodPrice: [model.foodPrice]
    });
    return new FormService(Coupon, form);
  }

  createCustomerForm(model: Customer = new Customer()): FormService<Customer> {
    const form = new FormBuilder().group({
      name: [model.name, Validators.required],
      family: [model.family, Validators.required],
      mobileNumber: [model.mobileNumber, [Validators.required, Validators.minLength(11)]],
      nationalCode: [model.nationalCode, [Validators.required, Validators.minLength(10)]],
      fatherName: [model.fatherName, Validators.required],
      birthDate: [model.birthDate, Validators.required],
      passportExpireDate: [model.passportExpireDate, Validators.required],
      passportNo: [model.passportNo, Validators.required]
    });
    return new FormService(Customer, form);
  }

  createReagentForm(model: Reagent = new Reagent()): FormService<Reagent> {
    const form = new FormBuilder().group({
      name: [model.name],
      family: [model.family, Validators.required],
      agencyName: [model.agencyName],
      cellPhone: [model.cellPhone],
      phone: [model.phone],
      email: [model.email],
    });
    return new FormService(Reagent, form);
  }

  createEditPasswordForm(model: EditPassword = new EditPassword()): FormService<EditPassword> {
    const form = new FormBuilder().group({
      oldPassword: [model.oldPassword, Validators.required],
      password: [model.password, Validators.required],
      rePassword: [model.rePassword, Validators.required],
    });
    return new FormService(EditPassword, form);
  }

}
