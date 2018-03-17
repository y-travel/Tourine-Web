import { Component, OnInit, Inject, Input } from '@angular/core';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Person, FormFactory, TeamMember, OptionType } from '../../../@core/data/models';
import { FormService } from '../../../@core/data/form.service';
import { DialogService } from '../../../@core/utils/dialog.service';
import { AgencyService } from '../../../@core/data/agency.service';
import { Observable } from 'rxjs/Rx';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-team-member-upsert',
  templateUrl: './team-member-upsert.component.html',
  styleUrls: ['./team-member-upsert.component.scss']
})

export class TeamMemberUpsertComponent implements OnInit, ModalInterface {

  optionType = OptionType;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<TeamMember>,
    public dialogInstance: MatDialogRef<ModalInterface>,
    private dialogService: DialogService,
    public formFactory: FormFactory,
    public service: PersonService) {
  }

  ngOnInit() {
  }

  findPerson(natCode: any) {
    this.service.GetPerson(natCode.value).subscribe(
      person => this.data.updateForm(Object.assign(new TeamMember(), { person: person })),
      () => {
        let teamMember = new TeamMember();
        //we use Object.assign cos last data remained in form by using dynamic cast.
        teamMember.person = new Person()
        teamMember.person.nationalCode = this.data.model.person.nationalCode;
        this.data.updateForm(teamMember);
      });
  }

  close() {
    if (this.data.model.person.id != "")
      this.service.UpdatePerson(this.data.model.person).subscribe(x => console.log(x));
    else
      this.service.AddPerson(this.data.model.person).subscribe(x => console.log(x));
    this.dialogInstance.close(this.data.model);
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
