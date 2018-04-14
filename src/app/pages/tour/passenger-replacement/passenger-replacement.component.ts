import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatInput, MatButton, MatStepper } from '@angular/material';
import { Tour, FormFactory, TeamMember, DialogMode, Agency, TourTeammember, Team, Person } from '../../../@core/data/models';
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
  templateUrl: './passenger-replacement.component.html',
  styleUrls: ['./passenger-replacement.component.scss']
})
export class PassengerReplacementComponent implements OnInit, Dialog {
  replacementResultForm: FormService<TourTeammember>;
  dialogMode: DialogMode;
  selectedPassengers: TeamMember[];
  selectedAgency: Agency;
  destinationTourId: string;
  buyerId: string;
  t: TourTeammember = new TourTeammember();
  @ViewChild('nextButton') nextButton: MatButton;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Tour>,
    public dialogInstance: MatDialogRef<ModalInterface>,
    private dialogService: DialogService,
    public formFactory: FormFactory,
    public service: PersonService,
    public tourGridService: PassengerReplacementTourGridService,
    @Inject(UTILS) public utils: AppUtils, ) {
    var tt = new Team();
    let p = new Person();
    p.name = 'dd';
    tt.buyer = p;

    tt.id = '';
    tt.infantPrice = 1;
    tt.basePrice = 2;
    tt.count = 3;
    this.t.teams = [];
    this.t.teams.push(tt);
    this.t.basePrice = 1000;
    this.t.infantPrice = 2000;
    this.replacementResultForm = this.formFactory.createReplacementResultForm(this.t);
  }

  initDialog() {
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
    this.save(stepper);
    if (stepper.selectedIndex == 1)
      this.nextButton.disabled = true;
    else
      this.nextButton.disabled = false;
  }

  previousStep(stepper: MatStepper) {
    stepper.previous();
    if (stepper.selectedIndex == 0)
      this.nextButton.disabled = false;
    else
      this.nextButton.disabled = true;
  }

  save(stepper: MatStepper) {
    this.service.passengerReplacement(this.data.model.id, this.destinationTourId, this.selectedPassengers, this.selectedAgency.id)
      .subscribe(x => {
        this.replacementResultForm.updateForm(x);
        // (<FormArray>this.replacementResultForm.form.get('teams')).controls.push(...x.teams.map((y) => <FormGroup>this.formFactory.createTeamForm(y)));
        this.replacementResultForm.form.controls.teams.setValue(x.teams.map(x => { x.id, x.basePrice, x.infantPrice, x.totalPrice, x.count, x.buyer }));
        stepper.next();
      }, y => console.log(y));
  }

  onGridReady(params: any) {
    this.tourGridService.onGridReady(params);
    this.tourGridService.getTourExcludedSource(this.data.model.id);
  }

  trackByFn(index: any, item: any) {
    return index; // or item.id
  }
}
