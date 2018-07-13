import { Injectable } from '@angular/core';
import { ReportType } from '../../../@core/data/models/enums';
import { GetReportData, GetReportFile } from '../../../@core/data/models/server.dtos';
import { FileService } from '../../../@core/data/file.service';
import { ApiService } from '../../../@core/data/api.service';
import { Observable } from 'rxjs/Rx';
import { PassengerDataReportBase } from '../../../@core/data/models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private fileService: FileService, private apiService: ApiService) {
  }

  getReportData(tourId: string, reportType: ReportType): Observable<PassengerDataReportBase> {
    const dto = new GetReportData();
    dto.tourId = tourId;
    dto.reportType = reportType;
    return this.apiService.get(dto);
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
    const dto = new GetReportFile();
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
