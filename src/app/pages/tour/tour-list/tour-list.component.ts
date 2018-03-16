import { Component, ViewChild } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { TourService } from '../../../@core/data/tour.service';
import { TourUpsertComponent } from '../tour-upsert/tour-upsert.component';
import { ReagentUpsertComponent } from '../reagent-upsert.component';
import { EditPasswordComponent } from '../edit-password.component';
import { DialogService } from '../../../@core/utils/dialog.service';
import { FormFactory } from '../../../@core/data/models/form-factory';
import { TourGridService } from '../tour-grid.service';
import { BlockUpsertComponent } from '../block-upsert/block-upsert.component';
import { PersonUpsertComponent } from '../person-upsert/person-upsert.component';
import { ToolbarItem } from '../../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';

@Component({
  selector: 'tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.scss']
})
export class TourListComponent {
  source: any;
  @ViewChild('tourGrid') tourGrid: AgGridNg2;

  constructor(private tourService: TourService,
              private formFactory: FormFactory,
              public dialogService: DialogService,
              public tourGridService: TourGridService) {
    this.tourGridService.toolbarItems.push(...tourItems);
  }

  refresh() {
    this.tourGrid.api.sizeColumnsToFit();
  }

  upsert() {
    const ref = this.dialogService.open(TourUpsertComponent, this.formFactory.createTourForm());
    ref.afterClosed().subscribe(data => this.tourGridService.reloadData());
  }

  bockUpsert() {
    const blockUpsertForm = this.formFactory.createReserveBlockForm();
    blockUpsertForm.model.parentId = 'c17496cf-7a71-451f-91da-1d10b165be13';
    const ref = this.dialogService.open(BlockUpsertComponent, blockUpsertForm);
    ref.afterClosed().subscribe(data => this.tourGridService.reloadData());
  }

  reagentUpsert() {
    this.dialogService.open(ReagentUpsertComponent, this.formFactory.createReagentForm());
  }

  personUpsert() {
    const inst = this.dialogService.open(PersonUpsertComponent, this.formFactory.createPersonForm());
    inst.afterClosed().subscribe(x => {
      console.log(x);
    });
  }

  userUpsert() {
    this.dialogService.open(EditPasswordComponent, this.formFactory.createEditPasswordForm());
  }
}

//@TODO get colors from global variables
const tourItems: ToolbarItem[] = [
  <ToolbarItem>{
    icon: 'delete',
    title: 'delete',
    color: '#f44336',
    command: (data) => {
      console.log(data);
    },
  }, <ToolbarItem>{
    icon: 'mode_edit',
    title: 'edit',
    color: '#03a9f4',
    command: (data) => {
    },
  },
  <ToolbarItem>{
    icon: 'group_add',
    title: 'passengerAdd',
    color: '#4caf50',
    command: (data) => {
      console.log(data);
    },
  },
];
