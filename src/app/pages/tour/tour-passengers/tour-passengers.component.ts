import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { PersonService } from '../../../@core/data/person.service';
import { FormFactory, TeamMember, Tour } from '../../../@core/data/models';
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
  styleUrls: ['./tour-passengers.component.scss'],
  providers: [TourPassengersGridService],
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
    this.passengerGridService.loadTourAgency(this.data.model.id);
  }

  ngOnInit() {
  }

  passengerReplacement() {
    const selectedPassengrs: TeamMember[] = this.passengerGridService.gridApi.getSelectedRows();
    if (selectedPassengrs.length > 0 &&
      selectedPassengrs.length === selectedPassengrs.filter(x => x.tourId === selectedPassengrs[0].tourId).length) {
      const ref = this.dialogService.openPopup(PassengerReplacementComponent, this.formFactory.createTourForm(this.data.model));
      (<any>ref.componentInstance).selectedPassengers = selectedPassengrs;
    } else {
      console.log('not same agency selected');
    }
  }

  onSelectionChanged() {
    const selectedRows = this.passengerGridService.gridApi.getSelectedRows();
    if (selectedRows.length > 0)
      this.passengerReplacementFab.disabled = false;
    else
      this.passengerReplacementFab.disabled = true;
  }
}
