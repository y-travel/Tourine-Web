import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PersonAgency } from '../../../@core/data/models/client.model';
import { FormService } from '../../../@core/data/form.service';
import { AgencyService } from '../../../@core/data/agency.service';
import { DialogMode } from '../../../@core/data/models/enums';
import { ModalInterface } from '../../../@theme/components/modal.interface';

@Component({
  selector: 'trn-agency-upsert',
  templateUrl: './agency-upsert.component.gen.html',
  styleUrls: ['./agency-upsert.component.scss']
})
export class AgencyUpsertComponent implements OnInit, ModalInterface {
  dialogMode: DialogMode;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<PersonAgency>,
              public service: AgencyService,
              public dialogRef: MatDialogRef<ModalInterface>) {
  }

  initDialog() {
  }

  ngOnInit() {
  }

  save() {
    //@TODO check validation
    if (this.data.form.valid) {
      this.service.addNewAgency(this.data.model).subscribe(agency => {
        this.dialogRef.close(this.data.model);
        console.log(agency);
      });
    }
  }
}
