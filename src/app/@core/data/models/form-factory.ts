import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
//
import { FormService } from '../form.service';
import { Agency, Block, EditPassword, Person, PersonAgency, Reagent, Tour, User } from './client.model';
import { TeamMember } from '.';

@Injectable()
export class FormFactory {

  createTourForm(model: Tour = new Tour()): FormService<Tour> {

    const form = new FormBuilder().group({
      status: [model.status],
      basePrice: [model.basePrice],
      capacity: [model.capacity, [Validators.required, Validators.min(1)]],
      infantPrice: [0, Validators.min(1)],
      options: new FormBuilder().array([this.optionsInit]),
      tourDetail: new FormBuilder().group({
        startDate: [new Date(), Validators.required],
        leaderId: [undefined],
        duration: [0, Validators.required],
        destinationId: [0, Validators.required],
        placeId: ['', Validators.required],
        isFlight: [true],
      }),
    });
    return new FormService(Tour, form);
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

  createReserveBlockForm(model: Block = new Block()): FormService<Block> {
    const form = new FormBuilder().group({
      id: [model.id],
      capacity: [model.capacity ? model.capacity : undefined, [Validators.required, Validators.min(1)]],
      infantPrice: [model.infantPrice ? model.infantPrice : undefined, Validators.required],
      busPrice: [model.busPrice ? model.busPrice : undefined, Validators.required],
      roomPrice: [model.roomPrice ? model.roomPrice : undefined, Validators.required],
      foodPrice: [model.foodPrice ? model.foodPrice : undefined, Validators.required],
      basePrice: [model.tourPrice ? model.tourPrice : undefined, Validators.required],
    });
    return new FormService(Block, form);
  }

  createPersonForm(model: Person = new Person()): FormService<Person> {
    const form = new FormBuilder().group({
      id: [model.id],
      name: [model.name, Validators.required],
      family: [model.family, Validators.required],
      mobileNumber: [model.mobileNumber, [Validators.required, Validators.minLength(11)]],
      nationalCode: [model.nationalCode, [Validators.required, Validators.minLength(10)]],
      englishName: [undefined, Validators.required],
      englishFamily: [undefined, Validators.required],
      birthDate: [model.birthDate, Validators.required],
      passportExpireDate: [model.passportExpireDate],
      passportNo: [model.passportNo],
      visaExpirDate: undefined,
      gender: [model.gender],
      isUnder5: [model.isUnder5],//@TODO: must calculate in client 
    });
    return new FormService(Person, form);
  }

  createTeamMemberForm(model: TeamMember = new TeamMember()): FormService<TeamMember> {
    const form = new FormBuilder().group({
      personId: [model.personId, Validators.required],
      person: this.createPersonForm(model.person ? model.person : new Person()).form,
      personIncomes: new FormBuilder().array([this.passengerOptionsInit]),
      visaDelivered: [model.visaDelivered,],
      passportDelivered: [model.passportDelivered],
    });
    return new FormService(TeamMember, form);
  }

  createAddPassengersForm(model: Block = new Block()): FormService<Block> {
    const form = new FormBuilder().group({
      id: [model.id],
      capacity: [model.capacity ? model.capacity : undefined, [Validators.required, Validators.min(1)]],
      infantPrice: [model.infantPrice ? model.infantPrice : undefined, Validators.required],
      busPrice: [model.busPrice ? model.busPrice : undefined, Validators.required],
      roomPrice: [model.roomPrice ? model.roomPrice : undefined, Validators.required],
      foodPrice: [model.foodPrice ? model.foodPrice : undefined, Validators.required],
      basePrice: [model.tourPrice ? model.tourPrice : undefined, Validators.required],
    });
    return new FormService(Block, form);
  }
  createAgenciesForm(model: Agency = new Agency()): FormService<Agency> {
    const form = new FormBuilder().group({
      id: [model.id, Validators.required],
      name: [model.name]
    });
    return new FormService(Agency, form);
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

  private optionsInit(): FormGroup {
    return new FormBuilder().group({
      optionType: [undefined, Validators.required],
      price: [undefined, Validators.required],
      optionStatus: [undefined, Validators.required],
      tourId: [undefined, Validators.required]
    });
  }

  private passengerOptionsInit(): FormGroup {
    return new FormBuilder().group({
      optionType: [undefined, Validators.required],
      receivedMoney: [undefined],
      incomeStatus: [undefined],
      currencyFactor: 1,
    });
  }
}
