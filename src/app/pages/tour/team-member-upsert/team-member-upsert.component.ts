import { Component, OnInit, Inject, Input } from '@angular/core';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { MAT_DIALOG_DATA, MatDialogRef, MatCheckboxChange } from '@angular/material';
import { Person, FormFactory, TeamMember, OptionType, PersonIncome } from '../../../@core/data/models';
import { FormService } from '../../../@core/data/form.service';
import { DialogService } from '../../../@core/utils/dialog.service';
import { AgencyService } from '../../../@core/data/agency.service';
import { Observable } from 'rxjs/Rx';
import { PersonService } from '../person.service';
import { UTILS, AppUtils } from '../../../@core/utils';
import { IncomeStatus } from '../../../@core/data/models/enums';

@Component({
  selector: 'app-team-member-upsert',
  templateUrl: './team-member-upsert.component.html',
  styleUrls: ['./team-member-upsert.component.scss']
})

export class TeamMemberUpsertComponent implements OnInit, ModalInterface {

  // //@TODO: ugly
  optionList: boolean[] = [];

  checkChanged(ev: MatCheckboxChange, optionName: string) {
    var enumValue: OptionType = OptionType[optionName];
    this.data.model.personIncomes.forEach(income => {
      if (income.optionType === enumValue)
        income.reserved = ev.checked;
    });
  }

  optionTypes() {
    return new Array(...this.utils.getEnumNames(OptionType)).filter(x => x !== OptionType[OptionType.Empty]);;
  }


  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<TeamMember>,
    public dialogInstance: MatDialogRef<ModalInterface>,
    private dialogService: DialogService,
    public formFactory: FormFactory,
    public service: PersonService,
    @Inject(UTILS) public utils: AppUtils, ) {
    data.model.personIncomes.forEach(element => {
      this.optionList.push(element.reserved);
    });
  }

  ngOnInit() {
  }

  findPerson(natCode: any) {
    this.service.GetPerson(natCode.value).subscribe(
      person => this.data.updateForm(Object.assign(new TeamMember(), { person: person, personId: person.id })),
      () => {
        let teamMember = new TeamMember();
        //we use Object.assign cos last data remained in form by using dynamic cast.
        teamMember.person = new Person()
        teamMember.person.nationalCode = this.data.model.person.nationalCode;
        this.data.updateForm(teamMember);
      });
  }

  close() {
    console.log(this.optionList);
    
    if (this.data.model.person.id != "")
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
gen(m:any){
  console.log(m);
  
}
  age(bDay: Date) {
    var now = new Date()
    var born = new Date(bDay);
    var age = Math.floor((now.getTime() - born.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    if (age < 5)
      this.data.model.person.isUnder5 = true;
    else
      this.data.model.person.isUnder5 = false;

    this.data.updateForm(this.data.model);
  }
}
