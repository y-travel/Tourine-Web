import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
//
import { FormService } from '../form.service';
import { Agency, Block, EditPassword, Person, PersonAgency, PersonIncome, Reagent, TeamMember, Tour, TourDetail, TourOption, User } from './client.model';

@Injectable()
export class FormFactory {

  createTourForm(model: Tour = new Tour()): FormService<Tour> {

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
          .map(x => this.createTourOptionForm(model.id, x)) //@TODO find a good solution for initializing options
      ),
      tourDetail: this.createTourDetailForm(model.tourDetail ? model.tourDetail : undefined),
    });
    return new FormService(Tour, form);
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

  createReserveBlockForm(model: Block = new Block()): FormService<Block> {
    const form = new FormBuilder().group({
      id: [model.id],
      capacity: [model.capacity ? model.capacity : undefined, [Validators.required, Validators.min(1)]],
      infantPrice: [model.infantPrice ? model.infantPrice : undefined, Validators.required],
      busPrice: [model.busPrice ? model.busPrice : undefined, Validators.required],
      roomPrice: [model.roomPrice ? model.roomPrice : undefined, Validators.required],
      foodPrice: [model.foodPrice ? model.foodPrice : undefined, Validators.required],
      basePrice: [model.basePrice ? model.basePrice : undefined, Validators.required],
    });
    return new FormService(Block, form);
  }

  createPersonForm(model: Person = new Person()): FormService<Person> {
    const form = new FormBuilder().group({
      id: [model.id],
      name: [model.name, Validators.required],
      family: [model.family, Validators.required],
      mobileNumber: [model.mobileNumber, [Validators.required, Validators.minLength(11)]],
      nationalCode: [model.nationalCode, [Validators.required, Validators.minLength(1)]], //@TODO: must be lenght of 10
      englishName: [model.englishName, Validators.required],
      englishFamily: [model.englishFamily, Validators.required],
      birthDate: [model.birthDate, Validators.required],
      passportExpireDate: [model.passportExpireDate],
      passportNo: [model.passportNo],
      visaExpireDate: [model.visaExpireDate],
      gender: [model.gender],
      isUnder5: [model.isUnder5], //@TODO: must calculate in client
      isInfant: [model.isInfant],
    });
    return new FormService(Person, form);
  }

  createTeamMemberForm(model: TeamMember = new TeamMember()): FormService<TeamMember> {
    const form = new FormBuilder().group({
      personId: [model.personId, Validators.required],
      person: this.createPersonForm(model.person ? model.person : new Person()).form,
      personIncomes: new FormBuilder().array(model.personIncomes.map(this.createPersonIncome)),
      haveVisa: [model.haveVisa],
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
      basePrice: [model.basePrice ? model.basePrice : undefined, Validators.required],
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

  createPersonIncome(model: PersonIncome = new PersonIncome()): FormGroup {
    return new FormBuilder().group({
      reserved: [model.reserved],
      optionType: [model.optionType, Validators.required],
      receivedMoney: [model.receivedMoney],
      incomeStatus: [model.incomeStatus],
      currencyFactor: model.currencyFactor,
    });
  }

  createBlockListForm(model: Block = new Block()): FormService<Block> {
    const form = new FormBuilder().group({
      id: [model.id],
      agencyId: [model.agencyId],
      parentId: [model.parentId]
    });
    return new FormService(Block, form);
  }
}
