import { Component, OnInit, ViewChild } from '@angular/core';
import { LeaderGridService } from '../leader-grid.service';
import { FormFactory, Person } from '../../../@core/data/models';
import { PersonService } from '../../../@core/data/person.service';
import { ToolbarItem } from '../../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';
import { DialogService } from '../../../@core/utils/dialog.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { PersonUpsertComponent } from '../leader-upsert/person-upsert.component';
import { DialogButtonType } from '../../../@core/data/models/enums';
import { AlertDialogData } from '../../../@theme/components/dialog/dialog.component';

@Component({
  selector: 'app-leader-list',
  templateUrl: './leader-list.component.html',
  styleUrls: ['./leader-list.component.scss'],
  providers: [LeaderGridService],
})
export class LeaderListComponent implements OnInit {
  leaderItems: ToolbarItem[] = [
    <ToolbarItem>{
      icon: 'delete',
      title: 'delete',
      color: '#f44336',
      alertData: new AlertDialogData('msg.delete', undefined, 'delete', DialogButtonType.Negative),
      command: (leader: Person) => this.leaderDelete(leader),
    }, <ToolbarItem>{
      icon: 'mode_edit',
      title: 'edit',
      color: '#03a9f4',
      command: (leader: Person) => this.leaderUpsert(leader),
    },
  ];

  @ViewChild('leaderGrid') leaderGrid: AgGridNg2;

  constructor(public formFactory: FormFactory,
              public leaderGridService: LeaderGridService,
              public personService: PersonService,
              public dialogService: DialogService,) {

    this.leaderGridService.initToolbar(this.leaderItems);
  }

  ngOnInit() {
  }

  leaderDelete(leader: Person) {
    this.personService.deleteLeader(leader.id).subscribe(() =>
      this.leaderGridService.loadData()
    );
  }

  leaderUpsert(person = <Person> {}) {
    const inst = this.dialogService.openPopup(PersonUpsertComponent, this.formFactory.createAddLeaderForm(person));
    inst.afterClosed().subscribe(() => {
      this.leaderGridService.loadData();
    });
  }

  refresh() {
    this.leaderGrid.api.sizeColumnsToFit();
  }
}
