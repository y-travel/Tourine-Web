import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ModalInterface } from '../../../@theme/components/modal.interface';
import { TourService } from '../../../@core/data/tour.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatTabChangeEvent } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { Destination, Dictionary, Person, Place, Tour } from '../../../@core/data/models/client.model';
import { DialogMode, OptionType } from '../../../@core/data/models/enums';
import { AppUtils, UTILS } from '../../../@core/utils/app-utils';
import { Dialog } from '../../../@core/utils/dialog.service';
import { TourReportGridService } from './tour-reports.service';
import { FormService, NewFormService } from '../../../@core/data/form.service';
import { FormatterService } from '../../../@core/utils/formatter.service';

@Component({
  selector: 'app-tour-reports',
  templateUrl: './tour-reports.component.html',
  styleUrls: ['./tour-reports.component.scss']
})

export class TourReportsComponent implements ModalInterface, Dialog {

  dialogMode: DialogMode;
  tourPassengers: any[];
  destinationList: Dictionary<string> = {};

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
              public reportGridService: TourReportGridService,
              private translateService: TranslateService,
              private formatter: FormatterService,
              @Inject(UTILS) public utils: AppUtils,) {
  }

  ngOnInit() {
    this.loadDestination();
  }

  onGridReady(event: any) {
    this.reportGridService.onGridReady(event);
    this.tourSerivce.getTickets(this.data.value.id).subscribe(x => {
      let list = x.passengers;
      list.unshift(x.leader);
      this.tourPassengers = list;
      list = list.filter(x => x.isInfant === false)
      this.reportGridService.setRow(list);

      this.adultCount = list.length;
      this.infantCount = this.tourPassengers.length - this.adultCount;
      this.startDate = this.formatter.getDateFormat(x.tour.tourDetail.startDate);
      this.destination = this.destinationList[x.tour.tourDetail.destinationId];

      var date = new Date(x.tour.tourDetail.startDate);
      date.setDate(date.getDate() + x.tour.tourDetail.duration);
      this.endDate = this.formatter.getDateFormat(date);
    })
  }

  tabChange(event: MatTabChangeEvent) {

    if (event.index == 0)
      this.reportGridService.setRow(this.tourPassengers.filter(x => x.isInfant === false));
    if (event.index == 1)
      this.reportGridService.setRow(this.tourPassengers.filter(x => x.isInfant === true));

    this.reportGridService.refresh();
  }

  loadDestination() {
    this.tourSerivce.getDistinations().subscribe((dests: Destination[]) => {
      dests.forEach(des => this.destinationList[des.id] = des.name);
    });
  }
}
