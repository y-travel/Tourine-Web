import { Component, OnInit, Inject } from '@angular/core';
import { FormFactory, Person } from '../../../@core/data/models';
import { AppUtils, UTILS } from '../../../@core/utils';
import { PersonService } from '../../../@core/data/person.service';
import { FormService } from '../../../@core/data/form.service';
import { Form } from '@angular/forms';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-leader-upsert',
  templateUrl: './leader-upsert.component.html',
  styleUrls: ['./leader-upsert.component.scss']
})
export class LeaderUpsertComponent implements OnInit {

  // data = this.formFactory.createAddLeaderForm();

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Person>,
    public formFactory: FormFactory,
    public dialogInstance: MatDialogRef<ModalInterface>,
    public service: PersonService,
    @Inject(UTILS) public utils: AppUtils, ) { }

  ngOnInit() {
  }

  findPerson(natCode: any) {
    this.service.GetPerson(natCode.value).subscribe(
      person => {
        this.data.model = person;
        this.data.updateForm();
        console.log(person);

      },
      () => {
        let person = new Person();
        //we use Object.assign cos last data remained in form by using dynamic cast.
        person.nationalCode = this.data.model.nationalCode;
        this.data.updateForm(person);
      });
  }

  close() {
    if (this.data.form.valid) {
      this.service.upsertLeader(this.data.model).subscribe(x => {
        this.dialogInstance.close();
      });
    }

  }

  age(bDay: Date) {
    var now = new Date()
    var born = new Date(bDay);
    var age = Math.floor((now.getTime() - born.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

    if (age < 2) {
      this.data.model.isInfant = true;
    }
    else if (age < 5) {
      this.data.model.isUnder5 = true;
      this.data.model.isInfant = false;
    }

    this.data.updateForm(this.data.model);
  }
}
