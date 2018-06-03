import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatButton, MatDialogRef, MatInput, MatStepper } from '@angular/material';
import { Agency, DialogMode, FormFactory, OptionType, Team, TeamMember, Tour } from '../../../@core/data/models';
import { FormService } from '../../../@core/data/form.service';
import { DialogService } from '../../../@core/utils/dialog.service';
import { PersonService } from '../../../@core/data/person.service';
import { AppUtils, UTILS } from '../../../@core/utils';
import { PassengerReplacementTourGridService } from './passenger-replacement-tour-grid.service';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { ToolbarItem } from '../../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';
import { TourUpsertComponent } from '../tour-upsert/tour-upsert.component';

@Component({
  selector: 'trn-passenger-replacement',
  templateUrl: './passenger-replacement.component.gen.html',
  styleUrls: ['./passenger-replacement.component.scss'],
  providers: [PassengerReplacementTourGridService]
})
export class PassengerReplacementComponent implements ModalInterface {
  replacementTourResultForm: FormService<any>;
  replacementTeamResultForm: FormService<Team>;
  dialogMode: DialogMode;
  selectedPassengers: TeamMember[];
  selectedAgency: Agency;
  sourceBlockId: string;
  sourceTourId: string;
  destinationTourId: string;
  showTour: boolean = undefined;

  optionType = OptionType;

  @ViewChild('nextButton') nextButton: MatButton;
  @ViewChild('submit') submitBtn: MatButton;

  blockItems = [
    <ToolbarItem>{
      icon: 'mode_edit',
      title: 'edit',
      color: '#03a9f4',
      command: (tour: any) => this.tourUpsert(tour, true),
    }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              public dialogInstance: MatDialogRef<ModalInterface>,
              private dialogService: DialogService,
              public formFactory: FormFactory,
              public service: PersonService,
              public tourGridService: PassengerReplacementTourGridService,
              @Inject(UTILS) public utils: AppUtils) {
    this.init(data);
  }

  initDialog() {
    this.submitBtn.disabled = true;
  }

  init(data: any) {
    this.sourceTourId = data.sourceTourId;
    this.sourceBlockId = data.sourceBlockId;
    this.selectedPassengers = data.selectedPassengers;
    this.selectedAgency = data.selectedAgency;

    this.replacementTourResultForm = this.formFactory.createReplacementTourResultForm();
    this.replacementTeamResultForm = this.formFactory.createReplacementTeamResultForm([]);
    this.tourGridService.setSourceTourId(this.sourceTourId);
    this.tourGridService.initToolbar(this.blockItems);
  }

  onFilterTextBoxChanged(searchContent: MatInput) {
    this.tourGridService.gridOptions.api.setQuickFilter(searchContent.value);
  }

  onSelectionChanged() {
    const selectedRows = this.tourGridService.gridApi.getSelectedRows();
    this.nextButton.disabled = selectedRows.length !== 1 || selectedRows[0].freeSpace <= 0;
    if (selectedRows.length === 0) {
      return;
    }
    if (!this.nextButton.disabled) {
      this.destinationTourId = selectedRows[0].id;
    } else {
      this.dialogService.openDialog('msg.thereIsNoFreeSpace');
    }
  }

  // @TODO pagination should be implement with directive
  nextStep(stepper: MatStepper) {
    this.replacePassenger(stepper);
    this.nextButton.disabled = stepper.selectedIndex === 0;
    this.submitBtn.disabled = stepper.selectedIndex !== 0;
  }

  previousStep(stepper: MatStepper) {
    stepper.previous();
    this.nextButton.disabled = stepper.selectedIndex !== 0;
    this.submitBtn.disabled = stepper.selectedIndex === 0;
  }

  replacePassenger(stepper: MatStepper) {
    this.service.passengerReplacement(this.sourceTourId, this.destinationTourId, this.selectedPassengers, this.selectedAgency.id)
      .subscribe(x => {
        x.isTeam ?
          this.replacementTeamResultForm = this.formFactory.createReplacementTeamResultForm(x.teams) :
          this.replacementTourResultForm = this.formFactory.createReplacementTourResultForm(x);
        this.showTour = !x.isTeam;
        stepper.next();
      });
  }

  tourUpsert(tour = new Tour(), isEdit = false) {
    console.log(tour)
    const ref = this.dialogService.openPopup(TourUpsertComponent, tour, isEdit ? DialogMode.Edit : DialogMode.Create);
    ref.afterClosed().subscribe(() => this.tourGridService.reloadData());
  }

  updateReplacement() {
    this.showTour ?
      this.service.tourAccomplish(this.replacementTourResultForm.model, this.sourceBlockId).subscribe(x => this.dialogInstance.close(true)) :
      this.service.teamAccomplish(this.replacementTeamResultForm.model, this.sourceBlockId).subscribe(x => this.dialogInstance.close(true));
  }
}
