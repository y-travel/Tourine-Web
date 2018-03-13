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
  }

  refresh(){
    this.tourGrid.api.sizeColumnsToFit();
    this.tourGrid.api.refreshHeader();
    this.tourGrid.api.refreshRows([]);
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

  userUpsert() {
    this.dialogService.open(EditPasswordComponent, this.formFactory.createEditPasswordForm());
  }
}
