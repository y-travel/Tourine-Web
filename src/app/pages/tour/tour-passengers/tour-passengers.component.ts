import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { PersonService } from '../../../@core/data/person.service';
import { BlocksGridService } from '../blocks-grid.service';
import { FormFactory, Tour } from '../../../@core/data/models';
import { DialogService } from '../../../@core/utils/dialog.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatButton } from '@angular/material';
import { FormService } from '../../../@core/data/form.service';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { PassengerGridService } from '../passenger-grid.service';
import { TourPassengersGridService } from './tour-passengers-grid.service';
import { PassengerReplacementComponent } from '../passenger-replacement/passenger-replacement.component';

@Component({
  selector: 'app-tour-passengers',
  templateUrl: './tour-passengers.component.html',
  styleUrls: ['./tour-passengers.component.scss']
})
export class TourPassengersComponent implements OnInit {



  @ViewChild('passengerReplacementFab') passengerReplacementFab: MatButton;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Tour>,
    public dialogInstance: MatDialogRef<ModalInterface>,
    private dialogService: DialogService,
    public formFactory: FormFactory,
    public passengerGridService: TourPassengersGridService,
    public personService: PersonService) {

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