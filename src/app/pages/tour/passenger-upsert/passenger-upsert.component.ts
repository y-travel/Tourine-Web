import { Component, OnInit, Inject } from '@angular/core';
import { DialogService } from '../../../@core/utils/dialog.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormService } from '../../../@core/data/form.service';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { PassengerGridService } from '../passenger-grid.service';
import { FormFactory } from '../../../@core/data/models/form-factory';
import { Block } from '../../../@core/data/models';

@Component({
  selector: 'app-passenger-upsert',
  templateUrl: './passenger-upsert.component.html',
  styleUrls: ['./passenger-upsert.component.scss']
}) 
export class PassengerUpsertComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Block>,
    public dialogInstance: MatDialogRef<ModalInterface>,
    private dialogService: DialogService,
    public formFactory: FormFactory,
    public passengerGridService: PassengerGridService
  ) {
  }


  ngOnInit() {
  }

}
