import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ComponentType } from './serializable';
import { FormService } from '../data/form.service';
import { ModalInterface } from '../../@theme/components/modal.interface';
import { DialogButtonType, DialogMode } from '../data/models/enums';
import { AlertDialogData, DialogComponent } from '../../@theme/components/dialog/dialog.component';

class TrnDialogConfig<T> extends MatDialogConfig<T> {
  constructor(data: T, public dialogMode?: DialogMode) {
    super();
    this.data = data;
    this.maxWidth = 1200;
  }
}

export interface Dialog {
  dialogMode: DialogMode;

  initDialog();
}

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  openPopup<T extends Dialog>(type: ComponentType<T>, data: FormService<T> | any, dialogMode = DialogMode.Create): MatDialogRef<ModalInterface> {
    const dialogRef = this.dialog.open(type, new TrnDialogConfig(data, dialogMode));
    dialogRef.componentInstance.dialogMode = dialogMode;
    dialogRef.componentInstance.initDialog();
    return dialogRef;
  }

  openDialog(content: string, applyText = 'ok', dialogButtonType = DialogButtonType.Positive) {
    const dialogConfig = new TrnDialogConfig(new AlertDialogData(content, 'cancel', applyText, dialogButtonType));
    dialogConfig.role = 'alertdialog';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    return dialogRef;
  }
}
