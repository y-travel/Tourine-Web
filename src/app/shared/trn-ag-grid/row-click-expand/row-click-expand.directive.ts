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
    const toolbarIcon = 'MAT-ICON';
    const row_expander = 'I';
    const nodeName = event.event.target.nodeName;

    if (nodeName !== toolbarIcon) {
      if (this.collapseOthers) {
        this.collapseAll(event);
      }
      if (nodeName !== row_expander) {
        this.rowToggle(event);
      }
      this.Grid.gridOptions.api.onGroupExpandedOrCollapsed(event.rowIndex);
    }
  }

  rowToggle(event) {
    event.node.expanded = event.node.expanded ? false : true;
  }

  collapseAll(event) {
    this.Grid.gridOptions.api.forEachNode(node => {
      node.expanded = event.node !== node ? false : node.expanded;
    });
  }
}
