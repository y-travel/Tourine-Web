import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatInput, MatButton, MatStepper } from '@angular/material';
import { Tour, FormFactory, TeamMember, DialogMode, Agency, TourTeamMember, Team, Person, Block, OptionType } from '../../../@core/data/models';
import { FormService } from '../../../@core/data/form.service';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { DialogService, Dialog } from '../../../@core/utils/dialog.service';
import { PersonService } from '../../../@core/data/person.service';
import { AppUtils, UTILS } from '../../../@core/utils';
import { TourGridService } from '../tour-grid.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { PassengerReplacementTourGridService } from './passenger-replacement-tour-grid.service';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-passenger-replacement',
  templateUrl: './passenger-replacement.component.gen.html',
  styleUrls: ['./passenger-replacement.component.scss']
})
export class PassengerReplacementComponent implements OnInit, Dialog {
  replacementTourResultForm: FormService<any>;
  replacementTeamResultForm: FormService<Team>;
  dialogMode: DialogMode;
  selectedPassengers: TeamMember[];
  selectedAgency: Agency;
  selectedTourId: string;
  destinationTourId: string;
  showTour: boolean = undefined;

  optionType = OptionType;

  @ViewChild('nextButton') nextButton: MatButton;
  @ViewChild('submit') submitBtn: MatButton;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Tour>,
    public dialogInstance: MatDialogRef<ModalInterface>,
    private dialogService: DialogService,
    public formFactory: FormFactory,
    public service: PersonService,
    public tourGridService: PassengerReplacementTourGridService,
    @Inject(UTILS) public utils: AppUtils, ) {
    this.replacementTourResultForm = this.formFactory.createReplacementTourResultForm();
    this.replacementTeamResultForm = this.formFactory.createReplacementTeamResultForm([]);
  }

  initDialog() {
    this.submitBtn.disabled = true;
  }

  ngOnInit() {
  }

  onFilterTextBoxChanged(searchContent: MatInput) {
    this.tourGridService.gridOptions.api.setQuickFilter(searchContent.value);
  }

  onSelectionChanged() {
    var selectedRows = this.tourGridService.gridApi.getSelectedRows();
    if (selectedRows.length == 1) {
      this.nextButton.disabled = false;
      this.destinationTourId = selectedRows[0].id;
    }
    else
      this.nextButton.disabled = true;
  }

  nextStep(stepper: MatStepper) {
    this.replacePassenger(stepper);
    if (stepper.selectedIndex == 0) {
      this.nextButton.disabled = true;
      this.submitBtn.disabled = false;
    }
    else {
      this.nextButton.disabled = false;
      this.submitBtn.disabled = true;
    }
  }

  previousStep(stepper: MatStepper) {
    stepper.previous();
    if (stepper.selectedIndex == 0) {
      this.nextButton.disabled = false;
      this.submitBtn.disabled = true;
    }
    else {
      this.nextButton.disabled = true;
      this.submitBtn.disabled = false;
    }
  }


  replacePassenger(stepper: MatStepper) {
    this.service.passengerReplacement(this.data.model.id, this.destinationTourId, this.selectedPassengers, this.selectedAgency.id)
      .subscribe(x => {
        x.isTeam ?
          this.replacementTeamResultForm = this.formFactory.createReplacementTeamResultForm(x.teams) :
          this.replacementTourResultForm = this.formFactory.createReplacementTourResultForm(x);
        this.showTour = !x.isTeam;
        stepper.next();
      });
  }

  updateReplacement() {
    this.showTour ?
      this.service.tourAccomplish(this.replacementTourResultForm.model, this.selectedTourId).subscribe(x => this.dialogInstance.close(true)) :
      this.service.teamAccomplish(this.replacementTeamResultForm.model, this.selectedTourId).subscribe(x => this.dialogInstance.close(true));
  }

  onGridReady(params: any) {
    this.tourGridService.onGridReady(params);
    this.tourGridService.getTourExcludedSource(this.data.model.id);
  }
}
