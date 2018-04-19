import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { DialogButtonType, ENUMS, EnumsDefinition } from '../../../@core/data/models/enums';
import { ModalInterface } from '../modal.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class DialogComponent {
  buttons: DialogButton[];

  constructor(private translate: TranslateService,
              @Inject(ENUMS) public enums: EnumsDefinition,
              @Inject(MAT_DIALOG_DATA) public data: AlertDialogData,
              public dialogInstance: MatDialogRef<ModalInterface>,) {

    if (data.applyButtonType === DialogButtonType.Neutral)
      throw new Error('Don\'t use neutral for apply button');

    this.buttons = []
    if (data.applyText)
      this.buttons.push(<DialogButton>{
        content: data.applyText,
        type: data.applyButtonType
      });

    this.buttons.push(<DialogButton>{
      content: data.cancelText,
      type: DialogButtonType.Neutral
    });
  }

  close(result?: any) {
    const dialogButton = (result as DialogButton);
    result = dialogButton !== null && dialogButton.type !== DialogButtonType.Neutral;
    this.dialogInstance.close(result);
  }
}

export class DialogButton {
  constructor(public content: string, public type: DialogButtonType) {
  }
}

//@TODO we should get decision between using dialogType or dialogButtonType
export class AlertDialogData {
  constructor(public content: string,
              public cancelText = 'cancel',
              public applyText = 'apply',
              public applyButtonType = DialogButtonType.Positive) {
    console.log(this.cancelText);
  }
}
