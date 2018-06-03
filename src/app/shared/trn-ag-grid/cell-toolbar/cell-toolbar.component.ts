import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { AlertDialogData } from '../../../@theme/components/dialog/dialog.component';

@Component({
  selector: 'trn-cell-toolbar',
  templateUrl: './cell-toolbar.component.html',
  styleUrls: ['./cell-toolbar.component.scss'],
})
export class CellToolbarComponent implements ICellRendererAngularComp {
  params: ICellRendererToolbarParams;
  items: any[];
  visibility: VisibilityType = 'autoHide';

  getData = () => this.params.node.data;

  refresh(params: any): boolean {
    return undefined;
  }

  agInit(params: any): void {
    this.params = params;
  }

  doCommand(item: ToolbarItem) {
    item.command(this.getData(), ...item.commandParams);
  }

  disablityFunction(item: any) {
    return item.disability ? item.disability(this.getData()) : false;
  }

  visibilityFunction(item: any) {
    return item.visibility ? item.visibility(this.getData()) : true;
  }
}

export class ICellRendererToolbarParams {
  node: any;
  items: ToolbarItem[];
}

export class ToolbarItem {
  icon = 'border_clear';
  title = '';
  color = '';
  command: (data: any, items?) => void;
  commandParams = [];
  disability: (data: any) => boolean;
  visibility: (data: any) => boolean;
  alertData: AlertDialogData;
}

declare type VisibilityType = 'autoHide' | 'hidden' | 'show';
