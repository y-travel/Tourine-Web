import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { ComponentType } from "./serializable";
import { FormService } from "../data/form.service";
import { ModalInterface } from "../../@theme/components/modal.interface";

const defaultDialogConfig = new MatDialogConfig();

@Injectable()
export class DialogService {

  config = <MatDialogConfig<FormService<any>>>{
    disableClose: false,
    panelClass: 'custom-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: '',
    height: '',
    minWidth: '',
    minHeight: '',
    maxWidth: defaultDialogConfig.maxWidth,
    maxHeight: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };

  constructor(private dialog: MatDialog) {
  }

  open<T>(type: ComponentType<T>, data: FormService<any>): MatDialogRef<ModalInterface> {
    this.config.data = data;
    return this.dialog.open(type, this.config);
  }
}
