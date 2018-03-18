import { Component, Inject, OnInit } from '@angular/core';
import { DialogService } from '../../../@core/utils/dialog.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormService } from '../../../@core/data/form.service';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { PassengerGridService } from '../passenger-grid.service';
import { FormFactory } from '../../../@core/data/models/form-factory';
import { Block, Person, TeamMember } from '../../../@core/data/models';
import { TeamMemberUpsertComponent } from '../team-member-upsert/team-member-upsert.component';
import { ToolbarItem } from '../../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';

@Component({
  selector: 'app-passenger-upsert',
  templateUrl: './passenger-upsert.component.html',
  styleUrls: ['./passenger-upsert.component.scss'],
  providers: [PassengerGridService]
})
export class PassengerUpsertComponent implements OnInit {

  sharedItems: ToolbarItem[] = [
    <ToolbarItem>{
      icon: 'delete',
      title: 'delete',
      color: '#f44336',
      command: (teamMember) => { this.teamMemberDelete(teamMember) },
    }, <ToolbarItem>{
      icon: 'mode_edit',
      title: 'edit',
      color: '#03a9f4',
      command: (teamMember) => { this.teamMemberUpsert(teamMember) },
    },
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Block>,
    public dialogInstance: MatDialogRef<ModalInterface>,
    private dialogService: DialogService,
    public formFactory: FormFactory,
    public passengerGridService: PassengerGridService) {

    this.passengerGridService.toolbarTourItems.push(...this.sharedItems);
  }


  ngOnInit() {
  }

  teamMemberDelete(teamMember: TeamMember) {
    this.passengerGridService.remove(teamMember);
  }

  teamMemberUpsert(teamMember: TeamMember = new TeamMember()) {
    const inst = this.dialogService.openPopup(TeamMemberUpsertComponent, this.formFactory.createTeamMemberForm(teamMember));
    inst.afterClosed().subscribe(x => {
      if (x != null) {
        this.passengerGridService.reloadData(x);
        console.log(x)
      }
    });
  }

  save() {
    this.dialogInstance.close();
  }
}
