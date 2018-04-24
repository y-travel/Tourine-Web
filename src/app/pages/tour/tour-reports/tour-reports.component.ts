import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ModalInterface } from '../../../@theme/components/modal.interface';
import { TourService } from '../../../@core/data/tour.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatTabChangeEvent } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { Destination, Dictionary, Person, Place, TeamMember, Tour } from '../../../@core/data/models/client.model';
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
  tourPassengers: any[];
  tourPassengersHaveVisa: TeamMember[];
  tourPassengersNoVisa: TeamMember[];
  destinationList: Dictionary<string> = {};
  selectedTab: ReportTab = 'ticket';
  adultCount = 0;
  infantCount = 0;
  startDate = '';
  endDate = '';
  destination = '';

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
      this.tourSerivce.getTickets(this.data.value.id).subscribe(x => {
        this.tourPassengers = x.passengers;
        this.tourPassengers.unshift(x.leader);
        this.reportGridService.setRow(this.tourPassengers.filter(x => x.isInfant === false));

        this.adultCount = this.tourPassengers.filter(x => x.isInfant === false).length;
        this.infantCount = this.tourPassengers.filter(x => x.isInfant === true).length;
        this.startDate = this.formatter.getDateFormat(x.tour.tourDetail.startDate);
        this.destination = this.destinationList[x.tour.tourDetail.destinationId];

        var date = new Date(Date.parse(x.tour.tourDetail.startDate));
        date.setDate(date.getDate() + x.tour.tourDetail.duration);
        this.endDate = this.formatter.getDateFormat(date.toISOString());
      })
    } else if (tab === 'visa') {
      this.reportGridService.gridApi.setColumnDefs(this.reportGridService.visaColumnDef);
      this.personService.getTourMembers(this.data.value.id).subscribe(x => {
        this.tourPassengersHaveVisa = x.passengers.filter(x => x.haveVisa === true);
        this.tourPassengersNoVisa = x.passengers.filter(x => x.haveVisa === false);
        this.reportGridService.setRow(this.tourPassengersHaveVisa);
      });
    }
    this.reportGridService.refresh();
  }

  mainTab(event: MatTabChangeEvent) {
    if (event.index == 0) {
      this.selectedTab = 'ticket';
      this.reportGridService.setRow(this.tourPassengers.filter(x => x.isInfant === false));
    }
    if (event.index == 1) {
      this.selectedTab = 'visa';
      this.reportGridService.setRow(this.tourPassengersHaveVisa);
    }
    this.reportGridService.refresh();
  }

  ticketTab(event: MatTabChangeEvent) {
    if (event.index == 0)
      this.reportGridService.setRow(this.tourPassengers.filter(x => x.isInfant === false));
    if (event.index == 1)
      this.reportGridService.setRow(this.tourPassengers.filter(x => x.isInfant === true));

    this.reportGridService.refresh();
  }

  visaTab(event: MatTabChangeEvent) {
    if (event.index == 0)
      this.reportGridService.setRow(this.tourPassengersHaveVisa);
    if (event.index == 1)
      this.reportGridService.setRow(this.tourPassengersNoVisa);

    this.reportGridService.refresh();
  }

  loadDestination() {
    this.tourSerivce.getDistinations().subscribe((dests: Destination[]) => {
      dests.forEach(des => this.destinationList[des.id] = des.name);
    });
  }
}


declare type ReportTab = 'ticket' | 'visa' | 'buyer' | 'tour';
