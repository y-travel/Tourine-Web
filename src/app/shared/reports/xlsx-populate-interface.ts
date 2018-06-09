import { CellInfo, ReportInterface } from './report';

export class XlsxPopulateInterface extends ReportInterface {

  workbook: any;

  async init(file: any) {
    await XlsxPopulate.fromDataAsync(file).then(workbook => this.workbook = workbook);
  }

  save() {
    this.workbook.outputAsync({type: 'base64'})
      .then((base64) => {
        location.href = 'data:' + XlsxPopulate.MIME_TYPE + ';base64,' + base64;
      });
  }

  setValue(cell: CellInfo) {
    const column = new Array(27).fill(1).map((_, i) => String.fromCharCode(64 + i));
    this.workbook.sheet(0).cell(column[cell.col] + '' + cell.row).value(cell.value);
  }
}
