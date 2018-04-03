import { Component, ViewChild } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { TourService } from '../../../@core/data/tour.service';
import { TourUpsertComponent } from '../tour-upsert/tour-upsert.component';
import { DialogService } from '../../../@core/utils/dialog.service';
import { FormFactory } from '../../../@core/data/models/form-factory';
import { TourGridService } from '../tour-grid.service';
import { BlockUpsertComponent } from '../block-upsert/block-upsert.component';
import { TeamMemberUpsertComponent } from '../team-member-upsert/team-member-upsert.component';
import { ToolbarItem } from '../../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';
import { Block, Tour } from '../../../@core/data/models/client.model';
import { PassengerUpsertComponent } from '../passenger-upsert/passenger-upsert.component';
import { BlockListComponent } from '../block-list/block-list.component';
import { TourPassengersComponent } from '../tour-passengers/tour-passengers.component';
import { PersonService } from '../../../@core/data/person.service';
import { TeamMember } from '../../../@core/data/models';

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
    },
    <ToolbarItem>{
      icon: 'list',
      title: 'tour.passengers',
      color: '#E040FB',
      command: (tour: any) => this.tourPassengers(tour),
    }
  ];
  blockItems = [
    <ToolbarItem>{
      icon: 'mode_edit',
      title: 'edit',
      color: '#03a9f4',
      command: (block: any) => this.blockUpsert(block),
    }, <ToolbarItem>{
      icon: 'list',
      title: 'team.list',
      color: '#E040FB',
      command: (block: any) => this.teamList(block),
    }];

  @ViewChild('tourGrid') tourGrid: AgGridNg2;

  reloadTourList = () => this.tourGridService.reloadData();

  constructor(private tourService: TourService,
    private personService: PersonService,
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
    this.tourService.deleteTour(tour).subscribe(() => this.reloadTourList());
  }

  blockUpsert(block = new Block()) {
    const ref = this.dialogService.openPopup(BlockUpsertComponent, this.formFactory.createReserveBlockForm(block));
    ref.afterClosed().subscribe(() => this.reloadTourList());
  }

  passengerUpsert(block = new Block()) {
    const ref = this.dialogService.openPopup(PassengerUpsertComponent, this.formFactory.createAddPassengersForm(block));
    ref.afterClosed().subscribe(() => this.reloadTourList());
  }

  teamList(block = new Block()) {
    this.dialogService.openPopup(BlockListComponent, this.formFactory.createTeamListForm(block));
  }

  tourPassengers(tour: Tour = new Tour()) {
    var form = this.formFactory.createTourPassengerForm(tour);
    var rows = this.personService.getTourMembers(tour.id).subscribe(x => {
      const ref = this.dialogService.openPopup(TourPassengersComponent, form);
      var list: TeamMember[] = x.passengers;
      (<any>ref.componentInstance).passengerGridService.setRow(list);
    });
  }

  rowselected(event: any) {
    console.log(event);
  }
}
