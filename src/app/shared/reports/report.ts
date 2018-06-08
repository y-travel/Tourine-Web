import { GetReportTemplate } from '../../@core/data/models/server.dtos';
import { ReportType } from '../../@core/data/models/enums';
import { FileService } from '../../@core/data/file.service';
import { first } from 'rxjs/operators';

export abstract class ReportInterface {
  abstract async init(file);

  abstract setValue(cell: CellInfo);

  abstract save();
}

export abstract class ReportBase {
  dto: GetReportTemplate;

  constructor(reportType: ReportType, private fileService: FileService) {
    this.dto = new GetReportTemplate();
    this.dto.reportType = reportType;
  }

  async print() {
    const data = this.resolveData();
    const templateFile = await this.getTemplate();
    if (templateFile == null) {
      return;
    }
    const engine = this.resolveEngine();
    await engine.init(templateFile);
    data.forEach(x => {
      engine.setValue(x);
    });
    engine.save();
  }

  async getTemplate() {
    return await this.fileService.get(this.dto).pipe(first()).toPromise().catch(() => null);
  }

  abstract resolveEngine(): ReportInterface;

  abstract resolveData(): CellInfo[];

}

export class CellInfo {
  constructor(public col, public row, public value) {
  }
}

