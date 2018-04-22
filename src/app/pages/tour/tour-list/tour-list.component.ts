import { Component, ViewChild } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';

import { TourService } from '../../../@core/data/tour.service';
import { TourUpsertComponent } from '../tour-upsert/tour-upsert.component';
import { DialogService } from '../../../@core/utils/dialog.service';
import { FormFactory } from '../../../@core/data/models/form-factory';
import { TourGridService } from '../tour-grid.service';
import { BlockUpsertComponent } from '../block-upsert/block-upsert.component';
import { ToolbarItem } from '../../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';
import { Block, Tour, Agency } from '../../../@core/data/models/client.model';
import { PassengerUpsertComponent } from '../passenger-upsert/passenger-upsert.component';
import { TeamListComponent } from '../block-list/team-list.component';
import { TourPassengersComponent } from '../tour-passengers/tour-passengers.component';
import { PersonService } from '../../../@core/data/person.service';
import { TeamMember } from '../../../@core/data/models';
import { DialogButtonType, DialogMode } from '../../../@core/data/models/enums';
import { AlertDialogData } from '../../../@theme/components/dialog/dialog.component';

@Component({
  selector: 'tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.scss'],
  providers: [TourGridService],
})
export class TourListComponent {

  //@TODO: should get from auth
  agency = Object.assign(new Agency() , { id: '5d0fd1903c6a45d99987f698b700cd43'});

  source: any;
  //@TODO use index to arrange items
  //@TODO get colors from global variables
  sharedItems: ToolbarItem[] = [
    <ToolbarItem>{
      icon: 'group_add',
      title: 'passenger.upsert',
      color: '#4caf50',
      command: (tourBlock: any) => this.passengerUpsert(tourBlock),
      disablity: (tour: any) => tour.freeSpace <= 0,
    },
  ];
  tourItems = [
    <ToolbarItem>{
      icon: 'delete',
      title: 'delete',
      color: '#f44336',
      alertData: new AlertDialogData('msg.delete', undefined, 'delete', DialogButtonType.Negative),
      command: (tourBlock: any) => this.tourDelete(tourBlock),
    },
    <ToolbarItem>{
      icon: 'mode_edit',
      title: 'edit',
      color: '#03a9f4',
      command: (tour: any) => this.tourUpsert(tour, true),
    },
    <ToolbarItem>{
      icon: 'work',
      title: 'tour.reserve',
      color: '#4caf50',
      command: (tour: any) => this.blockUpsert(tour),
      disablity: (tour: any) => tour.freeSpace <= 0,
    },
    <ToolbarItem>{
      icon: 'list',
      title: 'tour.passengers',
      color: '#E040FB',
      command: (tour: any) => this.tourPassengers(tour),
    },
  ];
  blockItems = [
    <ToolbarItem>{
      icon: 'delete',
      title: 'delete',
      color: '#f44336',
      alertData: new AlertDialogData('msg.delete', undefined, 'delete', DialogButtonType.Negative),
      command: (tourBlock: any) => this.tourDelete(tourBlock),
      visibility: (tour: Tour) => {
        return tour.agencyId !== this.agency.id;
      },
    },
    <ToolbarItem>{
      icon: 'mode_edit',
      title: 'edit',
      color: '#03a9f4',
      command: (block: any) => this.blockUpsert(block, true),
      visibility: (tour: Tour) => {
        return tour.agencyId !== this.agency.id;
      },
    },
    <ToolbarItem>{
      icon: 'list',
      title: 'team.list',
      color: '#E040FB',
      command: (block: any) => this.teamList(block),
    },
  ];

  @ViewChild('tourGrid') tourGrid: AgGridNg2;

  reloadTourList = () => this.tourGridService.reloadData();

  constructor(private tourService: TourService,
    private personService: PersonService,
    private formFactory: FormFactory,
    public dialogService: DialogService,
    public tourGridService: TourGridService) {

    this.tourGridService.initToolbar(this.sharedItems, this.tourItems, this.blockItems);
  }

  refresh() {
    this.tourGrid.api.sizeColumnsToFit();
  }

  tourUpsert(tour = new Tour(), isEdit = false) {
    const ref = this.dialogService.openPopup(TourUpsertComponent, tour, isEdit ? DialogMode.Edit : DialogMode.Create);
    ref.afterClosed().subscribe(() => this.reloadTourList());
  }

  tourDelete(tour: any) {
    if (!tour)
      return;
    this.tourService.deleteTour(tour).subscribe(() => this.reloadTourList());
  }

  blockUpsert(block: Block, isEdit = false) {
    const ref = this.dialogService.openPopup(BlockUpsertComponent, { block: block, tourId: block.id }, isEdit ? DialogMode.Edit : DialogMode.Create);
    ref.afterClosed().subscribe(() => this.reloadTourList());
  }

  passengerUpsert(block = new Block()) {
    if (block.freeSpace > 0) {
      const ref = this.dialogService.openPopup(PassengerUpsertComponent, this.formFactory.createAddPassengersForm(block));
      ref.afterClosed().subscribe(() => this.reloadTourList());
    }
  }

  teamList(block = new Block()) {
    this.dialogService.openPopup(TeamListComponent, this.formFactory.createTeamListForm(block));
  }

  tourPassengers(tour: Tour = new Tour()) {
    const form = this.formFactory.createTourPassengerForm(tour);
    const rows = this.personService.getTourMembers(tour.id).subscribe(x => {
      const ref = this.dialogService.openPopup(TourPassengersComponent, form);
      const list: TeamMember[] = x.passengers;
      (<any>ref.componentInstance).passengerGridService.setRow(list);
    });
  }
}
