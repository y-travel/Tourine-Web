import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormService } from '../../../@core/data/form.service';
import { Block, FormFactory, Team } from '../../../@core/data/models';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { DialogService } from '../../../@core/utils/dialog.service';
import { BlocksGridService } from '../blocks-grid.service';
import { ToolbarItem } from '../../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';
import { PassengerUpsertComponent } from '../passenger-upsert/passenger-upsert.component';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss']
})
export class BlockListComponent implements OnInit {

  teamsItem: ToolbarItem[] = [
    <ToolbarItem>{
      icon: 'delete',
      title: 'delete',
      color: '#f44336',
      command: (team: any) => this.teamDelete(team),
    }, <ToolbarItem>{
      icon: 'mode_edit',
      title: 'edit',
      color: '#03a9f4',
      command: (team: any) => this.passengerUpsert(team),
    },
  ];


  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Block>,
    public dialogInstance: MatDialogRef<ModalInterface>,
    private dialogService: DialogService,
    public formFactory: FormFactory,
    public blocksGridService: BlocksGridService,
    public personService: PersonService) {

    this.blocksGridService.toolbarBlockItems.push(...this.teamsItem);
    this.blocksGridService.model = this.data.model;
  }

  ngOnInit() {
  }

  passengerUpsert(test = new Block()) {
    //@TODO implement
    const ref = this.dialogService.openPopup(PassengerUpsertComponent, this.formFactory.createReserveBlockForm(test));
  }

  teamDelete(team = new Team) {
    this.personService.deleteTeam(team).subscribe(x => this.blocksGridService.remove(team));
  }
}
