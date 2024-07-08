import { Component, ViewEncapsulation } from '@angular/core';

import { TourService } from '../../../@core/data/tour.service';
import { TourUpsertComponent } from '../tour-upsert/tour-upsert.component';
import { DialogService } from '../../../@core/utils/dialog.service';
import { FormFactory } from '../../../@core/data/models/form-factory';
import { TourGridService } from '../tour-grid.service';
import { BlockUpsertComponent } from '../block-upsert/block-upsert.component';
import { ToolbarItem } from '../../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';
import { Block, Tour } from '../../../@core/data/models/client.model';
import { PassengerRegisterComponent } from '../../passenger/passenger-register/passenger-register.component';
import { TourBuyersComponent } from '../tour-buyers/tour-buyers.component';
import { TourPassengersComponent } from '../tour-passengers/tour-passengers.component';
import { PersonService } from '../../../@core/data/person.service';
import { Passenger } from '../../../@core/data/models';
import { DialogButtonType, DialogMode } from '../../../@core/data/models/enums';
import { AlertDialogData } from '../../../@theme/components/dialog/dialog.component';
import { TourReportsComponent } from '../tour-reports/tour-reports.component';
import { FileService } from '../../../@core/data/file.service';


@Component({
  selector: 'trn-tour-list',
  templateUrl: './tour-list.component.pug',
  styleUrls: ['./tour-list.component.scss'],
  providers: [TourGridService],
  encapsulation: ViewEncapsulation.Emulated, //@TODO clear it after changing theme infrastructure, cos ag-theme-material override new font-family
})
export class TourListComponent {

  blockItems = [
    <ToolbarItem>{
      index: 1,
      icon: 'list',
      title: 'buyer.list',
      color: '#E040FB',
      command: (block: any) => this.teamList(block),
      canEnable: (block: Tour) => block.freeSpace !== block.capacity,
    },
  ];
  source: any;
  //@TODO get colors from global variables
  sharedItems: ToolbarItem[] = [
    <ToolbarItem>{
      index: -1,
      icon: 'delete',
      title: 'delete',
      color: '#f44336',
      alertData: new AlertDialogData('msg.delete', undefined, 'delete', DialogButtonType.Negative),
      command: (tourBlock: any) => this.tourDelete(tourBlock),
      canShow: (tour: Tour) => tour.isBlock || tour.agency != null, //@todo clean, checking it's not first tour in block
    },
    <ToolbarItem>{
      index: -1,
      icon: 'mode_edit',
      title: 'edit',
      color: '#03a9f4',
      command: (tour: Tour) => tour.isBlock ? this.blockUpsert(tour.parent, <Block>tour) : this.tourUpsert(tour, true),
      canShow: (tour: Tour) => tour.isBlock || tour.agency != null, //@todo clean, checking it's not first tour in block
    },
    <ToolbarItem>{
      index: 1,
      icon: 'swap_horiz',
      title: 'passenger.swap',
      color: '#E040FB',
      command: (tour: any) => this.tourPassengers(tour),
      canEnable: (tour: Tour) => tour.freeSpace !== tour.capacity,
      canShow: (tour: Tour) => tour.agency != null, //@todo clean, checking it's not first tour in block
    },
    <ToolbarItem>{
      index: 1,
      icon: 'group_add',
      title: 'passenger.detailUpsert',
      color: '#4caf50',
      command: (tourBlock: any) => this.passengerUpsert(tourBlock),
      canEnable: (tour: any) => tour.freeSpace > 0,
      canShow: (tour: Tour) => tour.agency != null, //@todo clean, checking it's not first tour in block
    },
  ];
  tourItems = [
    <ToolbarItem>{
      index: 1,
      icon: 'work',
      title: 'tour.reserve',
      color: '#4caf50',
      command: (tour: any) => this.blockUpsert(tour, undefined, true),
      canEnable: (tour: any) => tour.freeSpace > 0,
    },
    <ToolbarItem>{
      index: 1,
      icon: 'pageview',
      title: 'reports.*',
      color: '#FF8F00',
      command: (tour: any) => this.tourReports(tour),
    }
  ];

  reloadTourList = () => this.tourGridService.reloadData();

  constructor(private tourService: TourService,
              private personService: PersonService,
              private formFactory: FormFactory,
              public dialogService: DialogService,
              public tourGridService: TourGridService,
              private fileService: FileService) {

    this.tourGridService.initToolbar(this.sharedItems, this.tourItems, this.blockItems);
  }

  tourUpsert(tour = new Tour(), isEdit = false) {
    const ref = this.dialogService.openPopup(TourUpsertComponent, tour, isEdit ? DialogMode.Edit : DialogMode.Create);
    ref.afterClosed().subscribe(() => {
      this.reloadTourList();
      this.tourGridService.reloadBlocks();
    });
  }

  tourDelete(tour: any) {
    if (!tour) {
      return;
    }
    this.tourService.deleteTour(tour).subscribe(() => {
      this.reloadTourList();
      this.tourGridService.reloadBlocks();
    }, error => {
      this.dialogService.openDialog('msg.deleteError');
    });
  }

  tourReports(tour: Tour = new Tour()) {
    const ref = this.dialogService.openPopup(TourReportsComponent, this.formFactory.createTourForm(tour));
  }

  blockUpsert(tour: Tour, block?: Block, isEdit = false) {
    const ref = this.dialogService.openPopup(BlockUpsertComponent, {tour: tour, block: block}, isEdit ? DialogMode.Edit : DialogMode.Create);
    ref.afterClosed().subscribe(() => {
      this.reloadTourList();
      this.tourGridService.reloadBlocks();
    });
  }

  passengerUpsert(block = new Block()) {
    if (block.freeSpace === 0) {
      return;
    }
    const ref = this.dialogService.openPopup(PassengerRegisterComponent, {block: block});
    ref.afterClosed().subscribe(() => {
        this.tourGridService.reloadBlocks();
        this.reloadTourList();
      }
    );
  }

  teamList(block = new Block()) {
    const ref = this.dialogService.openPopup(TourBuyersComponent, this.formFactory.createTeamListForm(block));
    ref.afterClosed().subscribe(() => {
      this.reloadTourList();
      this.tourGridService.reloadBlocks();
    });
  }

  tourPassengers(tour: Tour = new Tour()) {
    const form = this.formFactory.createTourPassengerForm(tour);
    const rows = this.personService.getTourMembers(tour.id).subscribe(x => {
      const ref = this.dialogService.openPopup(TourPassengersComponent, form);
      const list: Passenger[] = x.passengers;
      (<any>ref.componentInstance).passengerGridService.setRow(list);
    });
  }
}
