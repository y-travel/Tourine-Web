import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar, MatSnackBarRef } from '@angular/material';
import { ComponentType } from './serializable';
import { FormService } from '../data/form.service';
import { ModalInterface } from '../../@theme/components/modal.interface';
import { DialogButtonType, DialogMode } from '../data/models/enums';
import { AlertDialogData, DialogComponent } from '../../@theme/components/dialog/dialog.component';
import { TranslateService } from '@ngx-translate/core';

class TrnDialogConfig<T> extends MatDialogConfig<T> {
  constructor(data: T, public dialogMode?: DialogMode) {
    super();
    this.data = data;
    this.maxWidth = 1200;
  }
}

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private translate: TranslateService) {
  }

  openPopup<T extends ModalInterface>(type: ComponentType<T>, data: FormService<T> | any, dialogMode = DialogMode.Create): MatDialogRef<ModalInterface> {
    const dialogRef = this.dialog.open(type, new TrnDialogConfig(data, dialogMode));
    dialogRef.componentInstance.dialogMode = dialogMode;
    dialogRef.componentInstance.initDialog();
    return dialogRef;
  }

  openDialog(content: string, applyText?: string, dialogButtonType?: DialogButtonType, cancelText?: string) {
    const dialogConfig = new TrnDialogConfig(new AlertDialogData(content, cancelText, applyText, dialogButtonType));
    dialogConfig.role = 'alertdialog';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    return dialogRef;
  }

  showSnack(message: string, actionText = 'read', longDuration = true): MatSnackBarRef<any> {
    if (!message) {
      throw new Error('message should not be null');
    }
    return this.snackBar.open(this.translate.instant(message), this.translate.instant(actionText), {duration: longDuration ? 10000 : 5000});
  }
}
