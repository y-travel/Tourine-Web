/* tslint:disable */
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatCheckboxChange, MatDialogRef } from '@angular/material';
import { FormFactory, OptionType, Passenger, Person } from '../../../@core/data/models';
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

  checkChanged(ev: MatCheckboxChange, optionType: OptionType) {
    this.data.model.optionType ^= optionType;
  }

  optionTypes() {
    return new Array(...this.utils.getEnumNames(OptionType)).filter(x => x !== OptionType[OptionType.Empty]);
  }

  ngOnInit() {
  }

  findPerson(nationalCode: any) {
    this.service.GetPerson(nationalCode).subscribe(
      person => {
        person.type |= PersonType.Passenger;
        this.data.updateForm(<Passenger>{
          person: person,
          personId: person.id,
          optionType: person.isInfant ? OptionType.Empty : OptionType.getAll()
        });
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
      this.data.model.optionType = OptionType.Empty;
    } else if (age < 5) {
      this.data.model.person.isUnder5 = true;
      this.data.model.person.isInfant = false;
      this.data.model.optionType = OptionType.getAll();
    } else {
      this.data.model.person.isUnder5 = false;
      this.data.model.person.isInfant = false;
      this.data.model.optionType = OptionType.getAll();
    }

    this.data.updateForm(this.data.model);
  }

  getOptionValue(type: OptionType) {
    return OptionType.hasFlag(this.data.form.value.optionType, type);
  }
}
