import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ModalInterface } from '../../../@theme/components/modal.interface';
import { TourService } from '../../../@core/data/tour.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatTabChangeEvent } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { Destination, Dictionary, Person, Place, TeamMember, Tour, TourBuyer, TourPassenger } from '../../../@core/data/models/client.model';
import { DialogMode, OptionType } from '../../../@core/data/models/enums';
import { AppUtils, UTILS } from '../../../@core/utils/app-utils';
import { Dialog } from '../../../@core/utils/dialog.service';
import { TourReportGridService } from './tour-reports.service';
import { FormService, NewFormService } from '../../../@core/data/form.service';
import { FormatterService } from '../../../@core/utils/formatter.service';
import { PersonService } from '../../../@core/data/person.service';

@Component({
  selector: 'app-tour-reports',
  templateUrl: './tour-reports.component.html',
  styleUrls: ['./tour-reports.component.scss']
})
export class TourReportsComponent implements ModalInterface, Dialog {

  dialogMode: DialogMode;
  tourMembers: TeamMember[];
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
  haveVisaCount = 0;
  noHaveVisaCount = 0;

  initDialog() {
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: NewFormService<Tour>,
              public dialogInstance: MatDialogRef<ModalInterface>,
              public tourSerivce: TourService,
              public personService: PersonService,
              public reportGridService: TourReportGridService,
              private translateService: TranslateService,
              private formatter: FormatterService,
              @Inject(UTILS) public utils: AppUtils,) {
  }

  ngOnInit() {
    this.loadDestination();
    this.reportGridService.loadTourAgency(this.data.value.id);
  }

  onGridReady(event: any, tab: ReportTab) {

    this.reportGridService.onGridReady(event);
    if (tab === 'ticket') {
      this.reportGridService.gridApi.setColumnDefs(this.reportGridService.ticketColumnDef);
      this.personService.getTourMembers(this.data.value.id).subscribe(x => {
        this.tourMembers = x.passengers;
        const leader = new TeamMember();
        this.leader = x.leader || <Person>{};
        if (x.leader)
          this.tourMembers.unshift(Object.assign(leader, {person: x.leader}));
        this.reportGridService.setRow(this.tourMembers.filter(x => x.person.isInfant === false));
        this.setTourCards(x);
      });
    } else if (tab === 'visa') {
      this.reportGridService.gridApi.setColumnDefs(this.reportGridService.visaColumnDef);
      this.reportGridService.setRow(this.tourMembers.filter(x => x.haveVisa && x.person.id !== this.leader.id));
    } else if (tab === 'tour') {
      this.reportGridService.gridApi.setColumnDefs(this.reportGridService.tourColumnDef);
      this.reportGridService.setRow(this.tourMembers);
    } else if (tab === 'buyer') {
      this.reportGridService.gridApi.setColumnDefs(this.reportGridService.buyerColumnDef);
      this.tourSerivce.getTourBuyers(this.data.value.id).subscribe(x => {
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
    if (event.index === 0)
      this.reportGridService.setRow(this.tourMembers.filter(x => x.person.isInfant === false));
    if (event.index === 1)
      this.reportGridService.setRow(this.tourMembers.filter(x => x.person.isInfant === true));

    this.reportGridService.refresh();
  }

  visaTab(event: MatTabChangeEvent) {
    if (event.index === 0)
      this.reportGridService.setRow(this.tourMembers.filter(x => x.haveVisa === true && x.person.id !== this.leader.id));
    if (event.index === 1)
      this.reportGridService.setRow(this.tourMembers.filter(x => x.haveVisa === false && x.person.id !== this.leader.id));

    this.reportGridService.refresh();
  }

  loadDestination() {
    this.tourSerivce.getDistinations().subscribe((dests: Destination[]) => {
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
    this.noHaveVisaCount = this.tourMembers.filter(x => x.haveVisa === false && x.person.id !== this.leader.id).length;
    this.haveVisaCount = this.tourMembers.filter(x => x.haveVisa === true && x.person.id !== this.leader.id).length;
    this.bedCount = 0;
    this.tourMembers.forEach(x => {
      return this.bedCount += x.personIncomes.some(y => y.optionType === OptionType.Room) ? 1 : 0;
    });
  }
}

declare type ReportTab = 'ticket' | 'visa' | 'buyer' | 'tour';
