import { CellInfo, ReportBase, ReportInterface } from './report';
import { XlsxPopulateInterface } from './xlsx-populate-interface';

export class TourReport extends ReportBase {
  constructor() {
    super();
  }

  resolveEngine(): ReportInterface {
    return new XlsxPopulateInterface(null);
  }

  resolveData(): CellInfo[] {
    return [];
  }
}
