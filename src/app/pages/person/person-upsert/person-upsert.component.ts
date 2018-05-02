import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
//
import { FormFactory } from '../../../@core/data/models';
import { AppUtils, UTILS } from '../../../@core/utils';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { Dialog } from '../../../@core/utils/dialog.service';
import { DialogMode } from '../../../@core/data/models/enums';
import { PersonUpsertViewModel } from './person-upsert.view-model';
import { PersonService } from '../../../@core/data/person.service';

@Component({
  selector: 'app-person-upsert',
  templateUrl: './person-upsert.component.gen.html',
  styleUrls: ['./person-upsert.component.scss'],
  providers: [PersonUpsertViewModel],
})
export class PersonUpsertComponent implements Dialog {
  dialogMode: DialogMode;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public formFactory: FormFactory,
              public dialogInstance: MatDialogRef<ModalInterface>,
              public personService: PersonService,
              public vModel: PersonUpsertViewModel,
              @Inject(UTILS) public utils: AppUtils) {
  }

  initDialog() {
    this.vModel.init(this.data, this.dialogMode !== DialogMode.Create);
  }

  onNationalCodeChanged(inputBox: any) {
    if (this.dialogMode !== DialogMode.Create)
      return;
    this.vModel.findPerson(inputBox.value);
  }

  close() {
    if (this.vModel.isValid())
      this.personService.upsertLeader(this.vModel.model).subscribe(x => {
        this.dialogInstance.close();
      });
  }

  onBirthDateChanged(event: Date) {
    this.vModel.updatePersonAge(event);
  }

}
