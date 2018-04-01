import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatInput } from '@angular/material';
import { Tour, FormFactory } from '../../../@core/data/models';
import { FormService } from '../../../@core/data/form.service';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { DialogService } from '../../../@core/utils/dialog.service';
import { PersonService } from '../../../@core/data/person.service';
import { AppUtils, UTILS } from '../../../@core/utils';
import { TourGridService } from '../tour-grid.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { PassengerReplacementTourGridService } from './passenger-replacement-tour-grid.service';

@Component({
  selector: 'app-passenger-replacement',
  templateUrl: './passenger-replacement.component.html',
  styleUrls: ['./passenger-replacement.component.scss']
})
export class PassengerReplacementComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Tour>,
    public dialogInstance: MatDialogRef<ModalInterface>,
    private dialogService: DialogService,
    public formFactory: FormFactory,
    public service: PersonService,
    public tourGridService: PassengerReplacementTourGridService,
    @Inject(UTILS) public utils: AppUtils, ) { }

  ngOnInit() {
  }

  onFilterTextBoxChanged(searchContent: MatInput) {
    this.tourGridService.gridOptions.api.setQuickFilter(searchContent.value);
  }

}
