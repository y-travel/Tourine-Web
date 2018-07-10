import { Injectable } from '@angular/core';
import { ReportType } from '../../../@core/data/models/enums';
import { GetReport } from '../../../@core/data/models/server.dtos';
import { FileService } from '../../../@core/data/file.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private fileService: FileService) {
  }

  showPassengerReport(tourId: string) {
    this.showReport(tourId, ReportType.TourPassenger);
  }

  showTicketReport(tourId: string) {
    this.showReport(tourId, ReportType.Ticket);
  }

  showVisaReport(tourId: string) {
    this.showReport(tourId, ReportType.Visa);
  }

  private showReport(tourId: string, reportType: ReportType) {
    const dto = new GetReport();
    dto.tourId = tourId;
    dto.reportType = reportType;
    this.fileService.get(dto).subscribe(res => {
      if (res == null) {
        return;
      }
      window.open(URL.createObjectURL(res));
    });
  }

}
