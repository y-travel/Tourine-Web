import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
//
import { FormService, NewFormService } from '../form.service';
import {
  Agency,
  Block,
  EditPassword,
  Person,
  PersonAgency,
  PersonIncome,
  Team,
  Passenger,
  Tour,
  TourDetail,
  TourOption,
  TourTeamMember,
  User
} from './client.model';
import { CustomValidations, ValidationService } from '../../utils/validation.service';

@Injectable()
export class FormFactory {

  constructor(public validation: ValidationService) {
  }

  createTourForm(model: Tour = new Tour()): NewFormService<Tour> {

    const form = new FormBuilder().group({
      id: [model.id],
      parentId: [model.parentId],
      agencyId: [model.agencyId],
      status: [model.status],
      basePrice: [model.basePrice],
      capacity: [model.capacity, [Validators.required, Validators.min(1)]],
      infantPrice: [model.infantPrice, Validators.min(1)],
      options: new FormBuilder().array(
        (model.options ? model.options : new Tour().options)
          .map(x => this.createTourOptionForm(model.id, x)) // @TODO find a good solution for initializing options
      ),
      tourDetail: this.createTourDetailForm(model.tourDetail ? model.tourDetail : undefined),
    });
    return new NewFormService<Tour>(form, this.validation);
  }

  createTourOptionForm(tourId: string, model: TourOption = new TourOption()): FormGroup {
    return new FormBuilder().group({
      id: [model.id],
      tourId: [tourId],
      optionType: [model.optionType, Validators.required],
      price: [model.price, Validators.required],
      optionStatus: [model.optionStatus, Validators.required],
    });
  }

  createTourDetailForm(model: TourDetail = new TourDetail()): FormGroup {
    return new FormBuilder().group({
      id: [model.id],
      startDate: [model.startDate, Validators.required],
      leaderId: [model.leaderId],
      duration: [model.duration, Validators.required],
      destinationId: [model.destinationId, Validators.required],
      placeId: [model.placeId, Validators.required],
      isFlight: [model.isFlight],
    });
  }

  createAddAgencyForm(model: PersonAgency = new PersonAgency()): FormService<PersonAgency> {
    const form = new FormBuilder().group({
      agency: new FormBuilder().group({
        name: [model.agency ? model.agency.name : '', [Validators.required, Validators.minLength(2)]],
        phoneNumber: [model.agency ? model.agency.phoneNumber : undefined]
      }),
      person: new FormBuilder().group({
        name: [model.person ? model.person.name : '', [Validators.required, Validators.minLength(2)]],
        family: [model.person ? model.person.family : '', [Validators.required, Validators.minLength(2)]],
        mobileNumber: [model.person ? model.person.mobileNumber : undefined],
        socialNumber: [model.person ? model.person.socialNumber : undefined],
        gender: [model.person ? model.person.gender : true],
      }),
    });
    return new FormService(PersonAgency, form);
  }

  createAgencyForm(model: Agency = new Agency()): FormService<Agency> {
    const form = new FormBuilder().group({
      id: [model.id ? model.id : undefined],
      name: [model.name ? model.name : undefined]
    });
    return new FormService(Agency, form);
  }

  createPersonForm(model = <Person>{}): NewFormService<Person> {
    const form = new FormBuilder().group({
      id: [model.id],
      name: [model.name ? model.name : '',  [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      family: [model.family ? model.family : '',  [Validators.required, Validators.minLength(2)]],
      mobileNumber: [model.mobileNumber, [Validators.required, CustomValidations.lengthEqual(11)]],
      nationalCode: [model.nationalCode, [Validators.required, CustomValidations.lengthEqual(2)]], //@TODO: must be lenght of 10
      englishName: [model.englishName, Validators.required],
      englishFamily: [model.englishFamily, Validators.required],
      birthDate: [model.birthDate, Validators.required],
      passportExpireDate: [model.passportExpireDate],
      passportNo: [model.passportNo],
      visaExpireDate: [model.visaExpireDate],
      gender: [model.gender],
      isUnder5: [model.isUnder5], //@TODO: must calculate in client
      isInfant: [model.isInfant],
      type: [model.type],
    });
    return new NewFormService<Person>(form, this.validation);
  }

  createTeamMemberForm(model: Passenger = new Passenger()): FormService<Passenger> {
    const form = new FormBuilder().group({
      personId: [model.personId || ''],
      person: this.createPersonForm(model.person || undefined),
      optionType: new FormBuilder().array(model.optionType.map(this.createPersonIncome)),
      hasVisa: [model.hasVisa || ''],
      passportDelivered: [model.passportDelivered || ''],
    });
    return new FormService(Passenger, form);
  }

  createAddPassengersForm(model: Block = new Block()): FormService<Block> {
    const form = new FormBuilder().group({
      id: [model.id],
      parentId: [model.parentId],
      capacity: [model.capacity ? model.capacity : undefined, [Validators.required, Validators.min(1)]],
      infantPrice: [model.infantPrice ? model.infantPrice : undefined, Validators.required],
      busPrice: [model.busPrice ? model.busPrice : undefined, Validators.required],
      roomPrice: [model.roomPrice ? model.roomPrice : undefined, Validators.required],
      foodPrice: [model.foodPrice ? model.foodPrice : undefined, Validators.required],
      basePrice: [model.basePrice ? model.basePrice : undefined, Validators.required],
      totalPrice: [model.totalPrice ? model.totalPrice : 0, Validators.required],
    });
    return new FormService(Block, form);
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

  createPersonIncome(model: PersonIncome = new PersonIncome()): FormGroup {
    return new FormBuilder().group({
      reserved: [model.reserved],
      optionType: [model.optionType, Validators.required],
      receivedMoney: [model.receivedMoney],
      incomeStatus: [model.incomeStatus],
      currencyFactor: model.currencyFactor,
    });
  }

  createTeamListForm(model: Block = new Block()): FormService<Block> {
    const form = new FormBuilder().group({
      id: [model.id],
      agencyId: [model.agencyId],
      parentId: [model.parentId],
      infantPrice: [model.infantPrice],
      basePrice: [model.basePrice],

      foodPrice: [model.foodPrice],
      roomPrice: [model.roomPrice],
      busPrice: [model.busPrice],
    });
    return new FormService(Block, form);
  }

  createTourPassengerForm(model: Tour = new Tour()) {
    const form = new FormBuilder().group({
      id: [model.id],
    });
    return new FormService(Tour, form);
  }

  createReplacementTourResultForm(model: any = new Block()): FormService<any> {
    const form = new FormBuilder().group({
      id: [model.id ? model.id : undefined],
      basePrice: [model.basePrice ? model.basePrice : undefined],
      busPrice: [model.busPrice ? model.busPrice : undefined],
      infantPrice: [model.infantPrice ? model.infantPrice : undefined],
      roomPrice: [model.roomPrice ? model.roomPrice : undefined],
      foodPrice: [model.foodPrice ? model.foodPrice : undefined],
      agency: new FormControl({value: model.agency ? model.agency.name : '', disabled: true}),
    });
    return new FormService(TourTeamMember, form);
  }

  createReplacementTeamResultForm(model: Team[]): FormService<Team> {
    const form = new FormBuilder().group({
      teams: new FormBuilder().array(model ? model.map(x => this.createReplacementTeamForm(x)) : []),
    });
    return new FormService(Team, form);
  }

  createReplacementTeamForm(model: Team = new Team()): FormGroup {
    const form = new FormBuilder().group({
      id: [model.id ? model.id : undefined],
      tourId: [model.tourId ? model.tourId : undefined],
      basePrice: [model.basePrice ? model.basePrice : undefined],
      infantPrice: [model.infantPrice ? model.infantPrice : undefined],
      totalPrice: [model.totalPrice ? model.totalPrice : undefined],
      buyer: new FormControl({value: model.buyer.name + ' ' + model.buyer.family, disabled: true}),
      buyerId: [model.buyerId ? model.buyerId : undefined],
      buyerIsPassenger: [model.buyerIsPassenger ? model.buyerIsPassenger : undefined],
      count: [model.count ? model.count : undefined],
    });
    return form;
  }

  createTeamForm(model: Team = new Team()): FormGroup {
    const form = new FormBuilder().group({
      id: [model.id ? model.id : undefined],
      basePrice: [model.basePrice ? model.basePrice : undefined],
      infantPrice: [model.infantPrice ? model.infantPrice : undefined],
      totalPrice: [model.totalPrice ? model.totalPrice : undefined],
      // buyer: [model.buyer.name ? model.buyer.name : undefined],
      count: [model.count ? model.count : undefined],
      // buyer: this.createPersonForm(model.buyer ? model.buyer : undefined).form,
    });
    return form;
  }
}
