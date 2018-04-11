import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { PersonService } from '../../../@core/data/person.service';
import { FormFactory, Tour } from '../../../@core/data/models';
import { Dialog, DialogService } from '../../../@core/utils/dialog.service';
import { MAT_DIALOG_DATA, MatButton, MatDialogRef } from '@angular/material';
import { FormService } from '../../../@core/data/form.service';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { TourPassengersGridService } from './tour-passengers-grid.service';
import { PassengerReplacementComponent } from '../passenger-replacement/passenger-replacement.component';
import { DialogMode } from '../../../@core/data/models/enums';

@Component({
  selector: 'app-tour-passengers',
  templateUrl: './tour-passengers.component.html',
  styleUrls: ['./tour-passengers.component.scss']
})
export class TourPassengersComponent implements OnInit, Dialog {
  dialogMode: DialogMode;
  @ViewChild('passengerReplacementFab') passengerReplacementFab: MatButton;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Tour>,
              public dialogInstance: MatDialogRef<ModalInterface>,
              private dialogService: DialogService,
              public formFactory: FormFactory,
              public passengerGridService: TourPassengersGridService,
              public personService: PersonService) {

  }

  initDialog() {
  }

  ngOnInit() {
  }

  passengerReplacement() {
    const ref = this.dialogService.openPopup(PassengerReplacementComponent, this.formFactory.createTourForm(this.data.model));
    (<any>ref.componentInstance).selectedPassengers = this.passengerGridService.gridApi.getSelectedRows();
  }

  onSelectionChanged() {
    var selectedRows = this.passengerGridService.gridApi.getSelectedRows();
    if (selectedRows.length > 0)
      this.passengerReplacementFab.disabled = false;
    else
      this.passengerReplacementFab.disabled = true;
  }
}
