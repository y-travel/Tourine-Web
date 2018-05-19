import { Component, OnInit, ViewChild } from '@angular/core';
import { LeaderGridService } from '../leader-grid.service';
import { FormFactory, Person } from '../../../@core/data/models';
import { PersonService } from '../../../@core/data/person.service';
import { ToolbarItem } from '../../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';
import { DialogService } from '../../../@core/utils/dialog.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { PersonUpsertComponent } from '../person-upsert/person-upsert.component';
import { DialogButtonType, DialogMode } from '../../../@core/data/models/enums';
import { AlertDialogData } from '../../../@theme/components/dialog/dialog.component';

@Component({
  selector: 'trn-leader-list',
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
      command: (leader: Person) => this.personDelete(leader),
    }, <ToolbarItem>{
      icon: 'mode_edit',
      title: 'edit',
      color: '#03a9f4',
      command: (leader: Person) => this.personUpsert(leader, true),
    },
  ];

  @ViewChild('leaderGrid') leaderGrid: AgGridNg2;

  constructor(public formFactory: FormFactory,
              public leaderGridService: LeaderGridService,
              public personService: PersonService,
              public dialogService: DialogService, ) {

    this.leaderGridService.initToolbar(this.leaderItems);
  }

  ngOnInit() {
  }

  personDelete(person: Person) {
    this.personService.deleteLeader(person.id).subscribe(() =>
      this.leaderGridService.loadData()
    );
  }

  personUpsert(person = <Person> {}, isEdit = false) {
    const inst = this.dialogService.openPopup(PersonUpsertComponent, person, isEdit ? DialogMode.Edit : DialogMode.Create);
    inst.afterClosed().subscribe(() => {
      this.leaderGridService.loadData();
    });
  }

  refresh() {
    this.leaderGrid.api.sizeColumnsToFit();
  }
}
