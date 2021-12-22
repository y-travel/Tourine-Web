///<reference path="../../../@theme/components/modal.interface.ts"/>
import { Component, Inject } from '@angular/core';

import { ModalInterface } from '../../../@theme/components/modal.interface';
import { DialogMode } from '../../../@core/data/models';
import { AgencyTourListGridService } from './agency-tour-list-grid.service';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'trn-agency-list',
  templateUrl: './agency-tour-list.component.pug',
  styleUrls: ['./agency-tour-list.component.scss'],
  providers: [AgencyTourListGridService]
})
export class AgencyTourListComponent implements ModalInterface {
  dialogMode: DialogMode;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public agencyTourListGridService: AgencyTourListGridService) {
    this.agencyTourListGridService.setAgencyId(this.data.agencyId);
  }


  initDialog() {
  }

}
