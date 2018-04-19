import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { AlertDialogData } from '../../../@theme/components/dialog/dialog.component';

@Component({
  selector: 'app-cell-toolbar',
  templateUrl: './cell-toolbar.component.html',
  styleUrls: ['./cell-toolbar.component.scss'],
})
export class CellToolbarComponent implements ICellRendererAngularComp {
  params: ICellRendererToolbarParams;
  items: any[];
  visibility: VisibilityType = 'autoHide';

  refresh(params: any): boolean {
    return undefined;
  }

  agInit(params: any): void {
    this.params = params;
  }

  doCommand(item: ToolbarItem) {
    item.command(this.params.data, ...item.commandParams);
  }
}

export class ICellRendererToolbarParams {
  data: any;
  items: ToolbarItem[];
}

export class ToolbarItem {
  icon = 'border_clear';
  title = '';
  color = '';
  command: (data) => void;
  commandParams = [];
  alertData: AlertDialogData;
}

declare type VisibilityType = 'autoHide' | 'hidden' | 'show';
