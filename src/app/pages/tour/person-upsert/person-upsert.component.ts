import { Component, OnInit, Inject, Input } from '@angular/core';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Person, FormFactory } from '../../../@core/data/models';
import { FormService } from '../../../@core/data/form.service';
import { DialogService } from '../../../@core/utils/dialog.service';
import { AgencyService } from '../../../@core/data/agency.service';
import { Observable } from 'rxjs/Observable';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-upsert',
  templateUrl: './person-upsert.component.html',
  styleUrls: ['./person-upsert.component.scss']
})

export class PersonUpsertComponent implements OnInit, ModalInterface {

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Person>,
    public dialogInstance: MatDialogRef<ModalInterface>,
    private dialogService: DialogService,
    public formFactory: FormFactory,
    public service: PersonService) {
  }

  ngOnInit() {
  }
  findPerson(natCode: any) {
    this.service.GetPerson(natCode.value).subscribe(person => this.data.updateForm(person), () => {
      this.data.updateForm(Object.assign(new Person(), { nationalCode: this.data.model.nationalCode }));
    });
  }

  close() {
    if (this.data.model.id != "")
      this.service.UpdatePerson(this.data.model).subscribe(x => console.log(x));
    else
      this.service.AddPerson(this.data.model).subscribe(x => console.log(x));
    this.dialogInstance.close(this.data.model);
  }
}
 