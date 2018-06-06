export abstract class ReportInterface {
  abstract setValue(cell: CellInfo);

  abstract save();
}

export abstract class ReportBase {
  print() {
    const data = this.this.resolveData();
    const engine = this.resolveEngine();
    data.forEach(x => {
      engine.setValue(x);
    });
    engine.save();
  }

  abstract resolveEngine(): ReportInterface;

  abstract resolveData(): CellInfo[];

}

export class CellInfo {
  constructor(public col, public row, public value) {
  }
}

