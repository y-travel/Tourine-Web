import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { AlertDialogData } from '../components/dialog/dialog.component';
import { DialogService } from '../../@core/utils/dialog.service';

@Directive({
  selector: '[appDialog]'
})
export class DialogDirective {
  @Input('appDialog') data: AlertDialogData;
  @Output() confirmClick = new EventEmitter();

  constructor(private dialogService: DialogService) {
  }

  @HostListener('click')
  onClick() {
    if (this.data)
      this.dialogService.openDialog(this.data.content, this.data.applyText, this.data.applyButtonType)
        .afterClosed().subscribe(
        (res) => {
          if (res === true)
            this.confirmClick.emit();
        });
    else
      this.confirmClick.emit();
  }


}
