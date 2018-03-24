import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormService } from '../../../@core/data/form.service';
import { Block, FormFactory, TeamMember } from '../../../@core/data/models';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { DialogService } from '../../../@core/utils/dialog.service';
import { BlocksGridService } from '../blocks-grid.service';
import { ToolbarItem } from '../../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';
import { PassengerUpsertComponent } from '../passenger-upsert/passenger-upsert.component';
import { PersonService } from '../person.service';
import { PassengerGridService } from '../passenger-grid.service';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss'],
  providers: [BlocksGridService]
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

  passengerUpsert(team = new Block()) {
    //@TODO: ughly 
    //we want show team price instead of tour/block basePrice and infantPrice
    this.data.model.infantPrice = team.infantPrice;
    this.data.model.basePrice = team.basePrice;
    this.data.model.totalPrice = team.totalPrice;

    var form = this.formFactory.createAddPassengersForm(this.data.model);
    var rows = this.personService.getTeamMembers(team.id).subscribe(x => {
      const ref = this.dialogService.openPopup(PassengerUpsertComponent, form);
      var list: TeamMember[] = x.passengers;
      list.unshift(x.buyer);
      (<any>ref.componentInstance).passengerGridService.setRow(list);
      (<any>ref.componentInstance).updateCount();
      (<any>ref.componentInstance).teamId = team.id;//for upsert-> edit
      ref.afterClosed().subscribe(x => this.dialogInstance.close());
    });

  }

  teamDelete(team = new Block) {
    this.personService.deleteTeam(team).subscribe(x => this.blocksGridService.remove(team));
  }
}
