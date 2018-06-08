import { CellInfo, ReportBase, ReportInterface } from './report';
import { XlsxPopulateInterface } from './xlsx-populate-interface';
import { ReportType } from '../../@core/data/models/enums';
import { FileService } from '../../@core/data/file.service';

export class TourReport extends ReportBase {
  constructor(fileService: FileService) {
    super(ReportType.Tour, fileService);
  }

  resolveEngine(): ReportInterface {
    return new XlsxPopulateInterface();
  }

  resolveData(): CellInfo[] {
    return [];
  }
}
