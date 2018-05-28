import { Component, Inject, OnInit, ViewChild } from '@angular/core';
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
export class PassengerReplacementComponent implements OnInit, ModalInterface {
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

  blockItems = [
    <ToolbarItem>{
      icon: 'mode_edit',
      title: 'edit',
      color: '#03a9f4',
      command: (tour: any) => this.tourUpsert(tour, true),
    }
  ];
  reloadTourList = (tourid) => this.tourGridService.getTourExcludedSource(tourid);

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Tour>,
              public dialogInstance: MatDialogRef<ModalInterface>,
              private dialogService: DialogService,
              public formFactory: FormFactory,
              public service: PersonService,
              public tourGridService: PassengerReplacementTourGridService,
              @Inject(UTILS) public utils: AppUtils) {
    this.replacementTourResultForm = this.formFactory.createReplacementTourResultForm();
    this.replacementTeamResultForm = this.formFactory.createReplacementTeamResultForm([]);
    this.tourGridService.initToolbar(this.blockItems);
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

  nextStep(stepper: MatStepper) {
    this.replacePassenger(stepper);
    if (stepper.selectedIndex === 0) {
      this.nextButton.disabled = true;
      this.submitBtn.disabled = false;
    } else {
      this.nextButton.disabled = false;
      this.submitBtn.disabled = true;
    }
  }

  previousStep(stepper: MatStepper) {
    stepper.previous();
    if (stepper.selectedIndex === 0) {
      this.nextButton.disabled = false;
      this.submitBtn.disabled = true;
    } else {
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

  tourUpsert(tour = new Tour(), isEdit = false) {
    const ref = this.dialogService.openPopup(TourUpsertComponent, tour, isEdit ? DialogMode.Edit : DialogMode.Create);
    ref.afterClosed().subscribe(() => this.reloadTourList(this.data.model.id));
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
