import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormService } from '../../../@core/data/form.service';
import { Block, FormFactory } from '../../../@core/data/models';
import { DialogService } from '../../../@core/utils/dialog.service';
import { TeamGridService } from '../team-grid.service';
import { ToolbarItem } from '../../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';
import { PassengerRegisterComponent } from '../../passenger/passenger-register/passenger-register.component';
import { PersonService } from '../../../@core/data/person.service';
import { DialogButtonType, DialogMode } from '../../../@core/data/models/enums';
import { AlertDialogData } from '../../../@theme/components/dialog/dialog.component';
import { ModalInterface } from '../../../@theme/components/modal.interface';

@Component({
  selector: 'trn-block-list',
  templateUrl: './buyer-list.component.gen.html',
  styleUrls: ['./buyer-list.component.scss'],
  providers: [TeamGridService],
})

export class BuyerListComponent implements OnInit, ModalInterface {
  dialogMode: DialogMode;
  teamsItem: ToolbarItem[] = [
    <ToolbarItem>{
      icon: 'delete',
      title: 'delete',
      color: '#f44336',
      alertData: new AlertDialogData('msg.delete', undefined, 'delete', DialogButtonType.Negative),
      command: (team: any) => this.teamDelete(team),
    }, <ToolbarItem>{
      icon: 'mode_edit',
      title: 'edit',
      color: '#03a9f4',
      command: (team: any) => this.passengerRegister(team),
    },
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Block>,
              public dialogInstance: MatDialogRef<ModalInterface>,
              private dialogService: DialogService,
              public formFactory: FormFactory,
              public teamGridService: TeamGridService,
              public personService: PersonService) {

    this.teamGridService.initToolbar(this.teamsItem);
    this.teamGridService.model = this.data.model;

  }

  initDialog() {
  }

  ngOnInit() {
  }

  passengerRegister(team: any) {
    //@TODO: ughly
    //we want show team price instead of tour/block basePrice and infantPrice
    this.data.model.infantPrice = team.infantPrice;
    this.data.model.basePrice = team.basePrice;
    this.data.model.totalPrice = team.totalPrice;
    const block = this.data.model;
    const rows = this.personService.getTeamMembers(team.id).subscribe(x => {
      const ref = this.dialogService.openPopup(PassengerRegisterComponent, {buyer: team.buyer, teamId: team.id, block: block});
      (<any>ref.componentInstance).passengerGridService.setRow(x.passengers);
      (<any>ref.componentInstance).updateCount();
    });

  }

  teamDelete(team = new Block) {
    this.personService.deleteTeam(team).subscribe(x => this.teamGridService.remove(team));
  }
}
