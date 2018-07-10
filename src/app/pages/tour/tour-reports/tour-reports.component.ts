import { Component, Inject, OnInit } from '@angular/core';
import { TourService } from '../../../@core/data/tour.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatTabChangeEvent } from '@angular/material';
import { Destination, Dictionary, Passenger, Person, Tour, TourBuyer, TourPassenger } from '../../../@core/data/models/client.model';
import { DialogMode, OptionType } from '../../../@core/data/models/enums';
import { AppUtils, UTILS } from '../../../@core/utils/app-utils';
import { TourReportGridService } from './tour-reports-grid.service';
import { NewFormService } from '../../../@core/data/form.service';
import { FormatterService } from '../../../@core/utils/formatter.service';
import { PersonService } from '../../../@core/data/person.service';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { ReportService } from './report.service';

@Component({
  selector: 'trn-tour-reports',
  templateUrl: './tour-reports.component.pug',
  styleUrls: ['./tour-reports.component.scss']
})
export class TourReportsComponent implements ModalInterface, ModalInterface, OnInit {

  dialogMode: DialogMode;
  tourMembers: Passenger[];
  tourBuyers: TourBuyer[];
  destinationList: Dictionary<string> = {};
  selectedTab: ReportTab = 'ticket';

  adultCount = 0;
  infantCount = 0;
  bedCount = 0;
  startDate = '';
  endDate = '';
  destination = '';
  tourCode = '';
  leader: Person;
  hasVisaCount = 0;
  noHasVisaCount = 0;
  tourId: string;
  form: NewFormService<Tour>;

  constructor(@Inject(MAT_DIALOG_DATA) private data: NewFormService<Tour>,
              public dialogInstance: MatDialogRef<ModalInterface>,
              public tourService: TourService,
              public personService: PersonService,
              public reportGridService: TourReportGridService,
              private formatter: FormatterService,
              public reportService: ReportService,
              @Inject(UTILS) public utils: AppUtils) {
    this.form = data;
    this.tourId = this.form.value.id;
  }

  initDialog() {
  }

  ngOnInit() {
    this.loadDestination();
    this.reportGridService.loadTourAgency(this.tourId);
  }

  onGridReady(event: any, tab: ReportTab) {

    this.reportGridService.onGridReady(event);
    if (tab === 'ticket') {
      this.reportGridService.gridApi.setColumnDefs(this.reportGridService.ticketColumnDef);
      this.personService.getTourMembers(this.tourId).subscribe(x => {
        this.tourMembers = x.passengers;
        const leader = new Passenger();
        this.leader = x.leader || <Person>{};
        if (x.leader) {
          this.tourMembers.unshift(Object.assign(leader, {person: x.leader}));
        }
        this.reportGridService.setRow(this.tourMembers.filter(y => y.person.isInfant === false));
        this.setTourCards(x);
      });
    } else if (tab === 'visa') {
      this.reportGridService.gridApi.setColumnDefs(this.reportGridService.visaColumnDef);
      this.reportGridService.setRow(this.tourMembers.filter(x => x.hasVisa && x.person.id !== this.leader.id));
    } else if (tab === 'tour') {
      this.reportGridService.gridApi.setColumnDefs(this.reportGridService.tourColumnDef);
      this.reportGridService.setRow(this.tourMembers);
    } else if (tab === 'buyer') {
      this.reportGridService.gridApi.setColumnDefs(this.reportGridService.buyerColumnDef);
      this.tourService.getTourBuyers(this.tourId).subscribe(x => {
        this.tourBuyers = x;
        this.reportGridService.setRow(this.tourBuyers);
      });
    }

    this.reportGridService.refresh();
  }

  mainTab(event: MatTabChangeEvent) {
    if (event.index === 0) {
      this.selectedTab = 'ticket';
    } else if (event.index === 1) {
      this.selectedTab = 'visa';
    } else if (event.index === 2) {
      this.selectedTab = 'buyer';
    } else if (event.index === 3) {
      this.selectedTab = 'tour';
    }
  }

  ticketTab(event: MatTabChangeEvent) {
    if (event.index === 0) {
      this.reportGridService.setRow(this.tourMembers.filter(x => x.person.isInfant === false));
    }
    if (event.index === 1) {
      this.reportGridService.setRow(this.tourMembers.filter(x => x.person.isInfant === true));
    }

    this.reportGridService.refresh();
  }

  visaTab(event: MatTabChangeEvent) {
    if (event.index === 0) {
      this.reportGridService.setRow(this.tourMembers.filter(x => x.hasVisa === true && x.person.id !== this.leader.id));
    }
    if (event.index === 1) {
      this.reportGridService.setRow(this.tourMembers.filter(x => x.hasVisa === false && x.person.id !== this.leader.id));
    }

    this.reportGridService.refresh();
  }

  loadDestination() {
    this.tourService.getDistinations().subscribe((dests: Destination[]) => {
      dests.forEach(des => this.destinationList[des.id] = des.name);
    });
  }

  setTourCards(members: TourPassenger) {
    this.adultCount = this.tourMembers.filter(x => x.person.isInfant === false).length;
    this.infantCount = this.tourMembers.filter(x => x.person.isInfant === true).length;
    this.startDate = this.formatter.getDateFormat(members.tour.tourDetail.startDate);
    this.destination = this.destinationList[members.tour.tourDetail.destinationId];
    this.tourCode = members.tour.code;
    const date = new Date(Date.parse(members.tour.tourDetail.startDate));
    date.setDate(date.getDate() + members.tour.tourDetail.duration);
    this.endDate = this.formatter.getDateFormat(date.toISOString());
    this.noHasVisaCount = this.tourMembers.filter(x => x.hasVisa === false && x.person.id !== this.leader.id).length;
    this.hasVisaCount = this.tourMembers.filter(x => x.hasVisa === true && x.person.id !== this.leader.id).length;
    this.bedCount = 0;
    this.tourMembers.forEach(x => {
      return this.bedCount += OptionType.hasFlag(x.optionType, OptionType.Room) ? 1 : 0;
    });
  }
}

declare type ReportTab = 'ticket' | 'visa' | 'buyer' | 'tour';
