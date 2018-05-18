import { Component, ViewChild } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';

import { TourService } from '../../../@core/data/tour.service';
import { TourUpsertComponent } from '../tour-upsert/tour-upsert.component';
import { DialogService } from '../../../@core/utils/dialog.service';
import { FormFactory } from '../../../@core/data/models/form-factory';
import { TourGridService } from '../tour-grid.service';
import { BlockUpsertComponent } from '../block-upsert/block-upsert.component';
import { ToolbarItem } from '../../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';
import { Agency, Block, Tour } from '../../../@core/data/models/client.model';
import { PassengerUpsertComponent } from '../passenger-upsert/passenger-upsert.component';
import { TeamListComponent } from '../block-list/team-list.component';
import { TourPassengersComponent } from '../tour-passengers/tour-passengers.component';
import { PersonService } from '../../../@core/data/person.service';
import { TeamMember } from '../../../@core/data/models';
import { DialogButtonType, DialogMode } from '../../../@core/data/models/enums';
import { AlertDialogData } from '../../../@theme/components/dialog/dialog.component';
import { TourReportsComponent } from '../tour-reports/tour-reports.component';
import { FileService } from '../../../@core/data/file.service';
import { GetTicketReportTemplate } from '../../../@core/data/models/server.dtos';

@Component({
  selector: 'tour-list',
  templateUrl: './tour-list.component.gen.html',
  styleUrls: ['./tour-list.component.scss'],
  providers: [TourGridService],
})
export class TourListComponent {

  //@TODO: should get from auth
  agency = Object.assign(new Agency(), {id: '5d0fd1903c6a45d99987f698b700cd43'});
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
      disability: (block: Tour) => block.freeSpace === block.capacity,
    },
  ];
  //@TODO use index to arrange items
  source: any;
  //@TODO get colors from global variables
  sharedItems: ToolbarItem[] = [
    <ToolbarItem>{
      icon: 'group_add',
      title: 'passenger.upsert',
      color: '#4caf50',
      command: (tourBlock: any) => this.passengerUpsert(tourBlock),
      disability: (tour: any) => tour.freeSpace <= 0,
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
      disability: (tour: any) => tour.freeSpace <= 0,
    },
    <ToolbarItem>{
      icon: 'list',
      title: 'tour.passengers',
      color: '#E040FB',
      command: (tour: any) => this.tourPassengers(tour),
      disability: (tour: Tour) => tour.freeSpace === tour.capacity,
    },
    <ToolbarItem>{
      icon: 'pageview',
      title: 'reports.*',
      color: '#FF8F00',
      command: (tour: any) => this.tourReports(tour),
    },
  ];
  @ViewChild('tourGrid') tourGrid: AgGridNg2;

  reloadTourList = () => this.tourGridService.reloadData();

  constructor(private tourService: TourService,
              private personService: PersonService,
              private formFactory: FormFactory,
              public dialogService: DialogService,
              public tourGridService: TourGridService,
              private fileService: FileService) {

    this.tourGridService.initToolbar(this.sharedItems, this.tourItems, this.blockItems);
  }

  testFile() {
    let dto = new GetTicketReportTemplate();
    this.fileService.get(dto).subscribe(x => {
      console.log(x);
    });
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

  tourReports(tour: Tour = new Tour()) {
    const ref = this.dialogService.openPopup(TourReportsComponent, this.formFactory.createTourForm(tour));
  }

  blockUpsert(block: Block, isEdit = false) {
    const ref = this.dialogService.openPopup(BlockUpsertComponent, {block: block, tourId: block.id}, isEdit ? DialogMode.Edit : DialogMode.Create);
    ref.afterClosed().subscribe(() => this.reloadTourList());
  }

  passengerUpsert(block = new Block()) {
    if (block.freeSpace === 0)
      return;
    const ref = this.dialogService.openPopup(PassengerUpsertComponent, {block: block});
    ref.afterClosed().subscribe(() => this.reloadTourList());
  }

  teamList(block = new Block()) {
    const ref = this.dialogService.openPopup(TeamListComponent, this.formFactory.createTeamListForm(block));
    ref.afterClosed().subscribe(() => this.reloadTourList());
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
