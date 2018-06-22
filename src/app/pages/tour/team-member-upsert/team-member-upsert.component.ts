/* tslint:disable */
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatCheckboxChange, MatDialogRef } from '@angular/material';
import { FormFactory, OptionType, Passenger, Person, PersonIncome } from '../../../@core/data/models';
import { FormService } from '../../../@core/data/form.service';
import { DialogService } from '../../../@core/utils/dialog.service';
import { AppUtils, UTILS } from '../../../@core/utils';
import { PersonService } from '../../../@core/data/person.service';
import { DialogMode, PersonType } from '../../../@core/data/models/enums';
import { ModalInterface } from '../../../@theme/components/modal.interface';

@Component({
  selector: 'trn-team-member-upsert',
  templateUrl: './team-member-upsert.component.gen.html',
  styleUrls: ['./team-member-upsert.component.scss'],
})

export class TeamMemberUpsertComponent implements OnInit, ModalInterface, ModalInterface {
  dialogMode: DialogMode;
  optionType = OptionType;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Passenger>,
              public dialogInstance: MatDialogRef<ModalInterface>,
              private dialogService: DialogService,
              public formFactory: FormFactory,
              public service: PersonService,
              @Inject(UTILS) public utils: AppUtils) {
  }

  initDialog() {
  }

  checkChanged(ev: MatCheckboxChange, type: OptionType) {
    const index = this.data.model.optionType.findIndex(x => x.optionType === type);
    if (index < 0) {
      this.data.model.optionType.push(new PersonIncome(type));
    } else {
      this.data.model.optionType[index].optionType = OptionType.Empty;
    }
  }

  optionTypes() {
    return new Array(...this.utils.getEnumNames(OptionType)).filter(x => x !== OptionType[OptionType.Empty]);
  }

  ngOnInit() {
  }

  findPerson(nationalCode: any) {
    this.service.GetPerson(nationalCode).subscribe(
      person => {
        const team = new Passenger();
        if (person.isInfant) {
          team.optionType.forEach(x => x.optionType = OptionType.Empty);
        }
        person.type |= PersonType.Passenger;
        this.data.updateForm(Object.assign(team, {person: person, personId: person.id}));
      },
      () => {
        const teamMember = new Passenger();
        //we use Object.assign cos last data remained in form by using dynamic cast.
        teamMember.person = <Person>{};
        teamMember.person.nationalCode = this.data.model.person.nationalCode;
        this.data.updateForm(teamMember);
      });
  }

  close() {
    if (this.data.form.valid) {
      if (this.data.model.person.id !== null) {
        this.service.UpdatePerson(this.data.model.person).subscribe(x => {
          this.data.model.person = x;
          this.data.model.personId = x.id;
          this.dialogInstance.close(this.data.model);
        });
      } else {
        this.service.AddPerson(this.data.model.person).subscribe(x => {
          this.data.model.person = x;
          this.data.model.personId = x.id;
          this.dialogInstance.close(this.data.model);
        });
      }
    }

  }

  age(bDay: Date) {
    const now = new Date();
    const born = new Date(bDay);
    const age = Math.floor((now.getTime() - born.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

    if (age < 2) {
      this.data.model.person.isInfant = true;
      this.data.model.person.isUnder5 = false;
      this.data.model.optionType.forEach(element => element.optionType = OptionType.Empty);
    } else if (age < 5) {
      this.data.model.person.isUnder5 = true;
      this.data.model.person.isInfant = false;
      //@TODO: ughly
      this.data.model.optionType[0].optionType = OptionType.Bus;
      this.data.model.optionType[1].optionType = OptionType.Room;
      this.data.model.optionType[2].optionType = OptionType.Food;
    } else {
      //@TODO: ughly
      this.data.model.person.isUnder5 = false;
      this.data.model.person.isInfant = false;
      this.data.model.optionType[0].optionType = OptionType.Bus;
      this.data.model.optionType[1].optionType = OptionType.Room;
      this.data.model.optionType[2].optionType = OptionType.Food;
    }

    this.data.updateForm(this.data.model);
  }

  getOptionValue(type: OptionType) {
    return this.data.form.value.optionType.some(x => x.optionType === type);
  }
}
