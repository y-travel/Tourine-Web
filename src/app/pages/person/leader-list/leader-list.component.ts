import { Component, OnInit, ViewChild } from '@angular/core';
import { LeaderGridService } from '../leader-grid.service';
import { FormFactory, Person } from '../../../@core/data/models';
import { PersonService } from '../../../@core/data/person.service';
import { ToolbarItem } from '../../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';
import { DialogService } from '../../../@core/utils/dialog.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { LeaderUpsertComponent } from '../leader-upsert/leader-upsert.component';

@Component({
  selector: 'app-leader-list',
  templateUrl: './leader-list.component.html',
  styleUrls: ['./leader-list.component.scss']
})
export class LeaderListComponent implements OnInit {


  leaderItems: ToolbarItem[] = [
    <ToolbarItem>{
      icon: 'delete',
      title: 'delete',
      color: '#f44336',
      command: (leader: Person) => this.leaderDelete(leader),
    }, <ToolbarItem>{
      icon: 'mode_edit',
      title: 'edit',
      color: '#03a9f4',
      command: (leader: Person) => this.leaderEdit(leader),
    },
  ];

  @ViewChild('leaderGrid') leaderGrid: AgGridNg2;

  constructor(
    public formFactory: FormFactory,
    public leaderGridService: LeaderGridService,
    public personService: PersonService,
    public dialogService: DialogService, ) {

    this.leaderGridService.leaderToolbar.push(...this.leaderItems);
  }

  ngOnInit() {
  }

  leaderDelete(leader: Person) {
    this.personService.deleteLeader(leader.id).subscribe(() =>
      this.leaderGridService.loadData()
    );
  }

  leaderEdit(person: Person = new Person()) {
    const inst = this.dialogService.openPopup(LeaderUpsertComponent, this.formFactory.createAddLeaderForm(person));
    inst.afterClosed().subscribe(() => {
      this.leaderGridService.loadData()
    });
  }

  leaderUpsert(person: Person = new Person()) {
    const inst = this.dialogService.openPopup(LeaderUpsertComponent, this.formFactory.createAddLeaderForm(person));
    inst.afterClosed().subscribe(() => {
      this.leaderGridService.loadData()
    });
  }

  refresh() {
    this.leaderGrid.api.sizeColumnsToFit();
  }
}
