import { Component, Inject, OnInit } from '@angular/core';
import { DialogService } from '../../../@core/utils/dialog.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormService } from '../../../@core/data/form.service';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { PassengerGridService } from '../passenger-grid.service';
import { FormFactory } from '../../../@core/data/models/form-factory';
import { Block, OptionType, TeamMember } from '../../../@core/data/models';
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
      command: (teamMember) => {
        this.teamMemberDelete(teamMember)
      },
    }, <ToolbarItem>{
      icon: 'mode_edit',
      title: 'edit',
      color: '#03a9f4',
      command: (teamMember) => {
        this.teamMemberUpsert(teamMember, false/*edit*/)
      },
    },
  ];

  tourFreeSpace: number = 0;

  totalPrice: number;

  infantCount: number = 0;
  adultCount: number = 0;
  noneOptionCount: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Block>,
              public dialogInstance: MatDialogRef<ModalInterface>,
              private dialogService: DialogService,
              public formFactory: FormFactory,
              public passengerGridService: PassengerGridService,
              public service: PersonService,) {

    this.init();
  }


  ngOnInit() {
  }

  init() {
    this.passengerGridService.toolbarTourItems.push(...this.sharedItems);
    this.service.getTourFreeSpace(this.data.model.id).subscribe(x => this.tourFreeSpace = +x);
    this.service.getTourOptions(this.data.model.id).subscribe(x => {
      this.data.model.foodPrice = x.find(y => y.optionType === OptionType.Food).price;
      this.data.model.roomPrice = x.find(y => y.optionType === OptionType.Room).price;
      this.data.model.busPrice = x.find(y => y.optionType === OptionType.Bus).price;
    });

  }

  teamMemberDelete(teamMember: TeamMember) {
    this.passengerGridService.remove(teamMember);
    this.totalPrice = this.getTotal(this.passengerGridService.rows);
  }

  teamMemberUpsert(teamMember: TeamMember = new TeamMember(), isAdd: boolean = true) {
    if (this.tourFreeSpace <= this.passengerGridService.rows.length && isAdd) {
      console.log(this.data.model.capacity + '/' + this.passengerGridService.rows.length);//@TODO: show toast
    } else {
      const inst = this.dialogService.openPopup(TeamMemberUpsertComponent, this.formFactory.createTeamMemberForm(teamMember));
      inst.afterClosed().subscribe(x => {
        if (x == null)
          return;
        if (isAdd || (!isAdd && teamMember.person.id == x.person.id)) {
          this.passengerGridService.addItem(x);
        }//@TODO: update to a new person
        this.totalPrice = this.getTotal(this.passengerGridService.rows);
      });
    }
  }

  save() {
    if (this.passengerGridService.rows.length == 0)
      this.dialogInstance.close()
    else
      this.service.addTeam(this.passengerGridService.rows, this.data.model.id).subscribe(x => this.dialogInstance.close());
  }

  onPriceChange() {
    this.totalPrice = this.getTotal(this.passengerGridService.rows);
  }

  getTotal(members: TeamMember[]): number {

    var total: number = 0;
    this.infantCount = 0;
    this.noneOptionCount = 0;
    this.adultCount = 0;

    var noneOptionFoodCount = 0;
    var noneOptionRoomCount = 0;
    var noneOptionBusCount = 0;

    members.forEach(person => {

      if (person.person.isInfant)
        this.infantCount++;
      else if (person.person.isUnder5)
        this.noneOptionCount++;
      else
        this.adultCount++;

      person.personIncomes.some(x => x.optionType == OptionType.Food) ? noneOptionFoodCount : noneOptionFoodCount++;
      person.personIncomes.some(x => x.optionType == OptionType.Room) ? noneOptionRoomCount : noneOptionRoomCount++;
      person.personIncomes.some(x => x.optionType == OptionType.Bus) ? noneOptionBusCount : noneOptionBusCount++;
    });

    total += this.adultCount * this.data.model.basePrice;
    total += this.infantCount * this.data.model.infantPrice;
    total += this.noneOptionCount * this.data.model.basePrice;

    total -= noneOptionFoodCount * this.data.model.foodPrice;
    total -= noneOptionRoomCount * this.data.model.roomPrice;
    total -= noneOptionBusCount * this.data.model.busPrice;
    return total;
  }
}
