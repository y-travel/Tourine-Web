/* tslint:disable */
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatCheckboxChange, MatDialogRef } from '@angular/material';
import { ENUMS, FormFactory, OptionType } from '../../../@core/data/models';
import { DialogService } from '../../../@core/utils/dialog.service';
import { AppUtils, UTILS } from '../../../@core/utils';
import { PersonService } from '../../../@core/data/person.service';
import { DialogMode } from '../../../@core/data/models/enums';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'trn-passenger-upsert',
  templateUrl: './passenger-upsert.component.pug',
  styleUrls: ['./passenger-upsert.component.scss'],
})

export class PassengerUpsertComponent implements OnInit, ModalInterface, ModalInterface {
  dialogMode: DialogMode;
  optionType = OptionType;
  model: any;
  form: FormGroup;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogInstance: MatDialogRef<ModalInterface>,
              private dialogService: DialogService,
              public formFactory: FormFactory,
              public service: PersonService,
              @Inject(ENUMS) public enums: AppUtils,
              @Inject(UTILS) public utils: AppUtils) {
    this.model = data.model;
    this.form = data.form;
  }

  initDialog() {
  }

  checkChanged(ev: MatCheckboxChange, optionType: OptionType) {
    this.model.optionType ^= optionType;
  }

  optionTypes() {
    return new Array(...this.utils.getEnumNames(OptionType)).filter(x => x !== OptionType[OptionType.Empty]);
  }

  ngOnInit() {
  }


  save() {
    if (this.form.valid) {
      if (this.model.person.id != null) {
        this.service.UpdatePerson(this.model.person).subscribe(x => {
          this.model.person = x;
          this.model.personId = x.id;
          this.dialogInstance.close(this.model);
        });
      } else {
        this.service.AddPerson(this.model.person).subscribe(x => {
          this.model.person = x;
          this.model.personId = x.id;
          this.dialogInstance.close(this.model);
        });
      }
    }
  }

  getOptionValue(type: OptionType) {
    return OptionType.hasFlag(this.form.value.optionType, type);
  }
}
