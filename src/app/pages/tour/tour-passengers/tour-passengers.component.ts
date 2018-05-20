import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { PersonService } from '../../../@core/data/person.service';
import { FormFactory, TeamMember, Tour } from '../../../@core/data/models';
import { DialogService } from '../../../@core/utils/dialog.service';
import { MAT_DIALOG_DATA, MatButton, MatDialogRef } from '@angular/material';
import { FormService } from '../../../@core/data/form.service';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { TourPassengersGridService } from './tour-passengers-grid.service';
import { PassengerReplacementComponent } from '../passenger-replacement/passenger-replacement.component';
import { DialogMode } from '../../../@core/data/models/enums';

@Component({
  selector: 'trn-tour-passengers',
  templateUrl: './tour-passengers.component.gen.html',
  styleUrls: ['./tour-passengers.component.scss'],
  providers: [TourPassengersGridService],
})
export class TourPassengersComponent implements OnInit, ModalInterface {
  dialogMode: DialogMode;
  selectedTour = '';
  @ViewChild('passengerReplacementFab') passengerReplacementFab: MatButton;
  setStyle = (param?: any) => {
    //@TODO: use theme inst of hard code
    if (this.selectedTour !== '') {
      return param.data.tourId === this.selectedTour ? {background: '#C5E1A5'} : '';
    }
    return '';
  }

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
      const ref = this.dialogService.openPopup(PassengerReplacementComponent, this.formFactory.createSimpleTourForm(this.data.model));
      (<any>ref.componentInstance).selectedTourId = selectedPassengrs[0].tourId;
      (<any>ref.componentInstance).selectedPassengers = selectedPassengrs;
      (<any>ref.componentInstance).selectedAgency = this.passengerGridService.tourAgency[selectedPassengrs[0].tourId];
      ref.afterClosed().subscribe(x => {
        if (x) {
          this.dialogInstance.close();
        }
      });
    } else {
      this.dialogService.openDialog('msg.allowedPaassengerToReplace', null);
    }
  }

  onSelectionChanged() {
    const selectedRows = this.passengerGridService.gridApi.getSelectedRows();
    if (selectedRows.length > 0) {
      this.selectedTour = selectedRows[0].tourId;
      this.passengerReplacementFab.disabled = false;
    } else {
      this.passengerReplacementFab.disabled = true;
    }
    this.passengerGridService.refresh();
  }
}
