import { Component, Inject, OnInit } from '@angular/core';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { MAT_DIALOG_DATA, MatCheckboxChange, MatDialogRef } from '@angular/material';
import { FormFactory, OptionType, Person, PersonIncome, TeamMember } from '../../../@core/data/models';
import { FormService } from '../../../@core/data/form.service';
import { Dialog, DialogService } from '../../../@core/utils/dialog.service';
import { AppUtils, UTILS } from '../../../@core/utils';
import { PersonService } from '../../../@core/data/person.service';
import { DialogMode, PersonType } from '../../../@core/data/models/enums';

@Component({
  selector: 'app-team-member-upsert',
  templateUrl: './team-member-upsert.component.html',
  styleUrls: ['./team-member-upsert.component.scss']
})

export class TeamMemberUpsertComponent implements OnInit, ModalInterface, Dialog {
  dialogMode: DialogMode;
  optionType = OptionType;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<TeamMember>,
    public dialogInstance: MatDialogRef<ModalInterface>,
    private dialogService: DialogService,
    public formFactory: FormFactory,
    public service: PersonService,
    @Inject(UTILS) public utils: AppUtils, ) {

  }

  initDialog() {
  }

  checkChanged(ev: MatCheckboxChange, type: OptionType) {
    var index = this.data.model.personIncomes.findIndex(x => x.optionType === type);
    if (index < 0)
      this.data.model.personIncomes.push(new PersonIncome(type));
    else
      this.data.model.personIncomes[index].optionType = OptionType.Empty;
  }

  optionTypes() {
    return new Array(...this.utils.getEnumNames(OptionType)).filter(x => x !== OptionType[OptionType.Empty]);
  }

  ngOnInit() {
  }

  findPerson(natCode: any) {
    this.service.GetPerson(natCode.value).subscribe(
      person => {
        const team = new TeamMember();
        if (person.isInfant)
          team.personIncomes.forEach(x => x.optionType = OptionType.Empty);
        person.type |= PersonType.Passenger;
        this.data.updateForm(Object.assign(team, { person: person, personId: person.id }))
      },
      () => {
        let teamMember = new TeamMember();
        //we use Object.assign cos last data remained in form by using dynamic cast.
        teamMember.person = <Person>{};
        teamMember.person.nationalCode = this.data.model.person.nationalCode;
        this.data.updateForm(teamMember);
      });
  }

  close() {
    if (this.data.form.valid) {
      if (this.data.model.person.id != '')
        this.service.UpdatePerson(this.data.model.person).subscribe(x => {
          this.data.model.person = x,
            this.data.model.personId = x.id,
            this.dialogInstance.close(this.data.model)
        });
      else
        this.service.AddPerson(this.data.model.person).subscribe(x => {
          this.data.model.person = x,
            this.data.model.personId = x.id,
            this.dialogInstance.close(this.data.model)
        });
    }

  }

  age(bDay: Date) {
    var now = new Date()
    var born = new Date(bDay);
    var age = Math.floor((now.getTime() - born.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

    if (age < 2) {
      this.data.model.person.isInfant = true;
      this.data.model.person.isUnder5 = false;
      this.data.model.personIncomes.forEach(element => element.optionType = OptionType.Empty);
    }
    else if (age < 5) {
      this.data.model.person.isUnder5 = true;
      this.data.model.person.isInfant = false;
      //@TODO: ughly
      this.data.model.personIncomes[0].optionType = OptionType.Bus;
      this.data.model.personIncomes[1].optionType = OptionType.Room;
      this.data.model.personIncomes[2].optionType = OptionType.Food;
    }
    else {
      //@TODO: ughly
      this.data.model.person.isUnder5 = false;
      this.data.model.person.isInfant = false;
      this.data.model.personIncomes[0].optionType = OptionType.Bus;
      this.data.model.personIncomes[1].optionType = OptionType.Room;
      this.data.model.personIncomes[2].optionType = OptionType.Food;
    }

    this.data.updateForm(this.data.model);
  }

  getOptionValue(type: OptionType) {
    return this.data.form.value.personIncomes.some(x => x.optionType === type);
  }
}
