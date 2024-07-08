import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
//
import { FormFactory } from '../../../@core/data/models';
import { AppUtils, UTILS } from '../../../@core/utils';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { DialogMode } from '../../../@core/data/models/enums';
import { PersonUpsertViewModel } from './person-upsert.view-model';
import { PersonService } from '../../../@core/data/person.service';

@Component({
  selector: 'trn-person-upsert',
  templateUrl: './person-upsert.component.pug',
  styleUrls: ['./person-upsert.component.scss'],
  providers: [PersonUpsertViewModel],
})
export class PersonUpsertComponent implements ModalInterface {
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

  onNationalCodeChanged(nationalCode: any) {
    if (this.dialogMode !== DialogMode.Create) {
      return;
    }
    this.vModel.findPerson(nationalCode);
  }

  save() {
    if (this.vModel.isValid()) {
      this.personService.upsertLeader(this.vModel.model).subscribe(x => {
        this.dialogInstance.close(x);
      });
    }
  }

  onBirthDateChanged(event: Date) {
    this.vModel.updatePersonAge(event);
  }
}
