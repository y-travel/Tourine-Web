import { Component, Inject, OnInit } from '@angular/core';
import { TourService } from '../../../@core/data/tour.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Destination, Dictionary, PassengerDataReportBase, Tour, TourBuyer } from '../../../@core/data/models/client.model';
import { DialogMode, ReportType } from '../../../@core/data/models/enums';
import { AppUtils, UTILS } from '../../../@core/utils/app-utils';
import { TourReportGridService } from './tour-reports-grid.service';
import { NewFormService } from '../../../@core/data/form.service';
import { FormatterService } from '../../../@core/utils/formatter.service';
import { PersonService } from '../../../@core/data/person.service';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { ReportService } from './report.service';
import { TabType } from './tab-type';

@Component({
  selector: 'trn-tour-reports',
  templateUrl: './tour-reports.component.pug',
  styleUrls: ['./tour-reports.component.scss']
})
export class TourReportsComponent implements ModalInterface, ModalInterface, OnInit {

  reportData = <PassengerDataReportBase>{tourDetail: {}};
  dialogMode: DialogMode;
  tourBuyers: TourBuyer[];
  destinationList: Dictionary<string> = {};
  selectedTab = 0;
  currentTicketInnerTabIndex = 0; // @todo keep last state
  currentVisaInnerTabIndex = 0; // @todo keep last state

  tourId: string;
  form: NewFormService<Tour>;
  TabType = TabType;

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

  onGridReady(event: any, tabType: TabType) {
    this.reportGridService.onGridReady(event);
    this.reportGridService.changeGridColumnType(tabType);
    if (tabType === TabType.buyer) {
      this.tourService.getTourBuyers(this.tourId).subscribe(y => {
        this.tourBuyers = y;
        this.reportGridService.setRow(this.tourBuyers);
      });
      this.reportGridService.refresh();
    }
    const reportTab = this.getReportType(tabType);
    if (reportTab !== ReportType.None) {
      this.reportService.getReportData(this.tourId, reportTab).subscribe(x => {
        this.reportData = x;
        switch (tabType) {
          case TabType.ticket:
            this.ticketTab(this.currentTicketInnerTabIndex);
            break;
          case TabType.visa:
            this.visaTab(this.currentVisaInnerTabIndex);
            break;
          case TabType.tour:
            this.reportGridService.setRow(this.reportData.passengersInfos);
            break;
        }
        this.reportGridService.refresh();
      });
    }
  }

  ticketTab(tabIndex) {
    this.reportGridService.setRow(this.reportData.passengersInfos.filter(x => x.person.isInfant === !!tabIndex));
    this.reportGridService.refresh();
  }

  visaTab(tabIndex) {
    this.reportGridService.setRow(this.reportData.passengersInfos.filter(x => x.hasVisa === !tabIndex));
    this.reportGridService.refresh();
  }

  loadDestination() {
    this.tourService.getDistinations().subscribe((dests: Destination[]) => {
      dests.forEach(des => this.destinationList[des.id] = des.name);
    });
  }

  getReportType(tabType: TabType): ReportType {
    switch (tabType) {
      case TabType.tour:
        return ReportType.TourPassenger;
      case TabType.visa:
        return ReportType.Visa;
      case TabType.ticket:
        return ReportType.Ticket;
      default :
        return ReportType.None;
    }
  }
}
