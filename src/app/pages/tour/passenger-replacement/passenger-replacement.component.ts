import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatInput, MatButton, MatStepper } from '@angular/material';
import { Tour, FormFactory, TeamMember } from '../../../@core/data/models';
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

  selectedPassengers: TeamMember[];

  @ViewChild('nextButton') nextButton: MatButton;

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

  onSelectionChanged() {
    var selectedRows = this.tourGridService.gridApi.getSelectedRows();
    if (selectedRows.length == 1)
      this.nextButton.disabled = false;
    else
      this.nextButton.disabled = true;
  }

  nextStep(stepper: MatStepper) {
    stepper.next();
    if (stepper.selectedIndex == 1)
      this.nextButton.disabled = true;
    else
      this.nextButton.disabled = false;
  }

  previousStep(stepper: MatStepper){
    stepper.previous();
    if (stepper.selectedIndex == 0)
      this.nextButton.disabled = false;
    else
      this.nextButton.disabled = true;
  }
}
