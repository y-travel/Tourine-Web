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
import { PersonService } from '../person.service';

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
      command: (teamMember) => { this.teamMemberUpsert(teamMember, false/*edit*/) },
    },
  ];

  tourFreeSpace:number = 0 ;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Block>,
    public dialogInstance: MatDialogRef<ModalInterface>,
    private dialogService: DialogService,
    public formFactory: FormFactory,
    public passengerGridService: PassengerGridService,
    public service: PersonService, ) {

    this.passengerGridService.toolbarTourItems.push(...this.sharedItems);
    this.service.getTourFreeSpace(this.data.model.id).subscribe(x=> this.tourFreeSpace = +x);
  }


  ngOnInit() {
  }

  teamMemberDelete(teamMember: TeamMember) {
    this.passengerGridService.remove(teamMember);
  }

  teamMemberUpsert(teamMember: TeamMember = new TeamMember(), isAdd: boolean = true) {
    if (this.tourFreeSpace <= this.passengerGridService.rows.length && isAdd) {
      console.log(this.data.model.capacity + "/" + this.passengerGridService.rows.length);//@TODO: show toast
    } else {
      const inst = this.dialogService.openPopup(TeamMemberUpsertComponent, this.formFactory.createTeamMemberForm(teamMember));
      inst.afterClosed().subscribe(x => {
        if (x == null)
          return;
        if (isAdd || (!isAdd && teamMember.person.id == x.person.id)) {
          this.passengerGridService.addItem(x);
        }//@TODO: update to a new person 
      });
    }
  }

  save() {
    if (this.passengerGridService.rows.length == 0)
      this.dialogInstance.close()
    else
      this.service.addTeam(this.passengerGridService.rows, this.data.model.id).subscribe(x => this.dialogInstance.close());
  }
}
