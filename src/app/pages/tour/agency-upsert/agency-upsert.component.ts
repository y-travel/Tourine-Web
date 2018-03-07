import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Agency, PersonAgency } from "../../../@core/data/models/client.model";
import { FormService } from "../../../@core/data/form.service";
import { ModalInterface } from "../../../@theme/components/modal.interface";
import { AgencyService } from '../../../@core/data/agency.service';
import { Person } from '../../../@core/data/models';

@Component({
  selector: 'app-agency-upsert',
  templateUrl: './agency-upsert.component.html',
  styleUrls: ['./agency-upsert.component.scss']
})
export class AgencyUpsertComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<PersonAgency>,
    public service: AgencyService,
    public dialogRef: MatDialogRef<ModalInterface>) {
  }

  ngOnInit() {
  }

  save() {
    //@TODO check validation
    if (this.data.form.valid)
      this.service.addNewAgency(this.data.model).subscribe(agency => {
        this.dialogRef.close(this.data.model);
        console.log(agency);
      });
  }
}