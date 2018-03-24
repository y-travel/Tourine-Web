import { Component, ViewChild } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { TourService } from '../../../@core/data/tour.service';
import { TourUpsertComponent } from '../tour-upsert/tour-upsert.component';
import { EditPasswordComponent } from '../edit-password.component';
import { DialogService } from '../../../@core/utils/dialog.service';
import { FormFactory } from '../../../@core/data/models/form-factory';
import { TourGridService } from '../tour-grid.service';
import { BlockUpsertComponent } from '../block-upsert/block-upsert.component';
import { TeamMemberUpsertComponent } from '../team-member-upsert/team-member-upsert.component';
import { ToolbarItem } from '../../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';
import { Block, Tour } from '../../../@core/data/models/client.model';
import { PassengerUpsertComponent } from '../passenger-upsert/passenger-upsert.component';
import { BlockListComponent } from '../block-list/block-list.component';

@Component({
  selector: 'tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.scss']
})
export class TourListComponent {
  source: any;
  //@TODO use index to arrange items
  //@TODO get colors from global variables
  sharedItems: ToolbarItem[] = [
    <ToolbarItem>{
      icon: 'delete',
      title: 'delete',
      color: '#f44336',
      command: (tourBlock: any) => this.tourDelete(tourBlock),
    },
    <ToolbarItem>{
      icon: 'group_add',
      title: 'passenger.upsert',
      color: '#4caf50',
      command: (tourBlock: any) => this.passengerUpsert(tourBlock),
    },
  ];
  tourItems = [
    <ToolbarItem>{
      icon: 'mode_edit',
      title: 'edit',
      color: '#03a9f4',
      command: (tour: any) => this.tourUpsert(tour),
    },
    <ToolbarItem>{
      icon: 'work',
      title: 'tour.reserve',
      color: '#4caf50',
      command: (tour: any) => this.blockUpsert(tour),
    }
  ];
  blockItems = [
    <ToolbarItem>{
      icon: 'mode_edit',
      title: 'edit',
      color: '#03a9f4',
      command: (block: any) => this.blockUpsert(block),
   },<ToolbarItem>{
    icon: 'list',
    title: 'team.list',
    color: '#E040FB',
    command: (block: any) => this.teamList(block),
  }];
  
  @ViewChild('tourGrid') tourGrid: AgGridNg2;

  reloadTourList = () => this.tourGridService.reloadData();

  constructor(private tourService: TourService,
              private formFactory: FormFactory,
              public dialogService: DialogService,
              public tourGridService: TourGridService) {
    this.tourGridService.toolbarTourItems.push(...this.sharedItems, ...this.tourItems);
    this.tourGridService.toolbarBlockItems.push(...this.sharedItems, ...this.blockItems);
  }

  refresh() {
    this.tourGrid.api.sizeColumnsToFit();
  }

  tourUpsert(tour = new Tour()) {
    const ref = this.dialogService.openPopup(TourUpsertComponent, this.formFactory.createTourForm(tour));
    ref.afterClosed().subscribe(() => this.reloadTourList());
  }

  tourDelete(tour: any) {
    if (!tour)
      return;
    this.tourGridService.rows.pop();
    this.tourGridService.gridApi.refreshRows();
  }

  blockUpsert(block = new Block()) {
    const ref = this.dialogService.openPopup(BlockUpsertComponent, this.formFactory.createReserveBlockForm(block));
    ref.afterClosed().subscribe(() => this.reloadTourList());
  }

  passengerUpsert(block = new Block()) {
    const ref = this.dialogService.openPopup(PassengerUpsertComponent, this.formFactory.createAddPassengersForm(block));
    ref.afterClosed().subscribe(() => this.reloadTourList());
  }

  //@region test upsert
  personUpsert(person) {
    const inst = this.dialogService.openPopup(TeamMemberUpsertComponent, this.formFactory.createPersonForm());
    inst.afterClosed().subscribe(x => {
      console.log(x);
    });
  }

  addPassengers() {
    this.dialogService.openPopup(PassengerUpsertComponent, this.formFactory.createAddPassengersForm());
  }

  userUpsert() {
    this.dialogService.openPopup(EditPasswordComponent, this.formFactory.createEditPasswordForm());
  }

  teamList(block = new Block()) {
    this.dialogService.openPopup(BlockListComponent, this.formFactory.createTeamListForm(block));
  }

  //@end-region
}
