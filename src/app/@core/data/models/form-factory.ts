import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
//
import { FormService } from '../form.service';
import { Coupon, Person, EditPassword, Reagent, Tour, User } from './client.model';

@Injectable()
export class FormFactory {

  createTourForm(model: Tour = new Tour()): FormService<Tour> {
    const form = new FormBuilder().group({
      status: [model.status],
      basePrice: [model.basePrice],
      capacity: [model.capacity, [Validators.required, Validators.min(1)]],
      tourDetail: new FormBuilder().group({
        startDate: [new Date(2000, 2, 2), Validators.required],
        leaderId: [undefined],
        duration: [0, Validators.required],
        destinationId: [0, Validators.required],
        placeId: ['', Validators.required],
        busPrice: [0],
        roomPrice: [0],
        foodPrice: [0],
        isFlight: [true],
        infantPrice: [0, Validators.min(1)],
      }),
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
      foodPrice: [model.foodPrice],
    });
    return new FormService(Coupon, form);
  }

  createPersonForm(model: Person = new Person()): FormService<Person> {
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
    return new FormService(Person, form);
  }

  createReagentForm(model: Reagent = new Reagent()): FormService<Reagent> {
    const form = new FormBuilder().group({
      name: [model.name],
      family: [model.family, Validators.required],
      agencyName: [model.agencyName],
      mobileNumber: [model.mobileNumber],
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

  createLoginForm(model: User = new User()): FormService<User> {
    const form = new FormBuilder().group({
      username: [model.username, Validators.required],
      password: [model.password, Validators.required]
    });
    return new FormService(User, form);
  }
}
