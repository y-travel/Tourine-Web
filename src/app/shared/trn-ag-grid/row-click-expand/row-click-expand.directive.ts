import { Directive, HostListener } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';

@Directive({
  selector: '[rowClickExpand]'
})
export class RowClickExpandDirective {

  collapseOthers: Boolean = true;

  constructor(private Grid: AgGridNg2) {
  }

  @HostListener('rowClicked', ['$event']) onRowClicked(event) {
    if (this.collapseOthers) {
      this.Grid.gridOptions.api.forEachNode(node => {
        if (event.node !== node) {
          node.expanded = false;
        }
      });
    }
    if (event.event.target.nodeName !== 'I' && event.event.target.nodeName !== 'MAT-ICON') {
      event.node.expanded = event.node.expanded ? false : true;
    }
    this.Grid.gridOptions.api.onGroupExpandedOrCollapsed(event.rowIndex);

  }
}
