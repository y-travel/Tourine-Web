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
  data: any;
  canEnable = (item: ToolbarItem) => item.canEnable != null ? item.canEnable(this.data) : true;
  canShow = (item: ToolbarItem) => item.canShow != null ? item.canShow(this.data) : true;

  private _items: ToolbarItem[];

  get items(): ToolbarItem[] {
    return this._items;
  }

  refresh(params: any): boolean {
    return undefined;
  }

  agInit(params: any): void {
    this.params = params;
    this._items = this.params.items.sort((a, b) => a.index - b.index);
    this.data = this.params.node.data;
  }

  doCommand(item: ToolbarItem) {
    item.command(this.data, ...item.commandParams);
  }
}

export class ICellRendererToolbarParams {
  node: any;
  items: ToolbarItem[];
}

export class ToolbarItem {
  index = 0;
  icon = 'border_clear';
  title = '';
  color = '';
  command: (data: any, items?) => void;
  commandParams = [];
  canEnable: (data: any) => boolean;
  canShow: (data: any) => boolean;
  alertData: AlertDialogData;
}

