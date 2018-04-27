import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Dialog, DialogService } from '../../../@core/utils/dialog.service';
import { MAT_DIALOG_DATA, MatButton, MatDialogRef, MatStepper } from '@angular/material';
import { FormService } from '../../../@core/data/form.service';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { PassengerGridService } from '../passenger-grid.service';
import { FormFactory } from '../../../@core/data/models/form-factory';
import { Block, OptionType, Person, TeamMember } from '../../../@core/data/models';
import { TeamMemberUpsertComponent } from '../team-member-upsert/team-member-upsert.component';
import { ToolbarItem } from '../../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';
import { PersonService } from '../../../@core/data/person.service';
import { DialogButtonType, DialogMode } from '../../../@core/data/models/enums';
import { AlertDialogData } from '../../../@theme/components/dialog/dialog.component';

@Component({
  selector: 'app-passenger-upsert',
  templateUrl: './passenger-upsert.component.html',
  styleUrls: ['./passenger-upsert.component.scss'],
  providers: [PassengerGridService]
})
export class PassengerUpsertComponent implements OnInit, Dialog {

  dialogMode: DialogMode;

  @ViewChild('nextButton') nextButton: MatButton;
  @ViewChild('submit') submit: MatButton;
  disablingItems = ['person.name', 'person.family', 'person.mobileNumber', 'person.gender', 'person.englishName', 'person.englishFamily', 'person.birthDate'];

  toolbarItems: ToolbarItem[] = [
    <ToolbarItem>{
      icon: 'delete',
      title: 'delete',
      color: '#f44336',
      alertData: new AlertDialogData('msg.delete', undefined, 'delete', DialogButtonType.Negative),
      command: (teamMember) => this.teamMemberDelete(teamMember),
    }, <ToolbarItem>{
      icon: 'mode_edit',
      title: 'edit',
      color: '#03a9f4',
      command: (teamMember) => {
        this.teamMemberUpsert(teamMember, false/*edit*/);
      },
    },
  ];

  tourFreeSpace = 0;
  totalPrice: number;
  infantCount = 0;
  adultCount = 0;
  noneOptionCount = 0;
  public rows: any[];
  public teamId: string = undefined;
  public isEditable = true;
  public buyer = new TeamMember();
  public buyerForm: FormService<TeamMember>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Block>,
              public dialogInstance: MatDialogRef<ModalInterface>,
              private dialogService: DialogService,
              public formFactory: FormFactory,
              public passengerGridService: PassengerGridService,
              public service: PersonService,) {

    this.init();
  }


  ngOnInit() {
    this.buyerForm = this.formFactory.createTeamMemberForm(this.buyer);
    this.buyerForm.disableControl(true, this.disablingItems);
    this.updateSubmitStatus();
  }

  initDialog() {
    this.submit.disabled = true;
  }

  init() {
    this.passengerGridService.initToolbar(this.toolbarItems);
    this.service.getTourFreeSpace(this.data.model.id).subscribe(x => this.tourFreeSpace = +x);
    this.service.getTourOptions(this.data.model.id).subscribe(x => {
      this.data.model.foodPrice = x.find(y => y.optionType === OptionType.Food).price;
      this.data.model.roomPrice = x.find(y => y.optionType === OptionType.Room).price;
      this.data.model.busPrice = x.find(y => y.optionType === OptionType.Bus).price;
    });
  }

  teamMemberDelete(teamMember: TeamMember) {
    this.passengerGridService.remove(teamMember);
    this.tourFreeSpace++;
    this.updateTotalPrice();
    this.updateSubmitStatus();
  }

  teamMemberUpsert(teamMember: TeamMember = new TeamMember(), isAdd: boolean = true) {
    if (this.tourFreeSpace <= 0 && isAdd) {
      this.dialogService.openDialog('msg.thereIsNoFreeSpace', null);
      return;
    }
    const inst = this.dialogService.openPopup(TeamMemberUpsertComponent, this.formFactory.createTeamMemberForm(teamMember));
    inst.afterClosed().subscribe(x => {
      if (x == null)
        return;
      if (isAdd || (!isAdd && teamMember.person.id === x.person.id)) {
        this.passengerGridService.addItem(x);
        this.updateSubmitStatus();
        this.tourFreeSpace--;
      }
      //@TODO: update to a new person
      this.updateTotalPrice();
    });
  }

  updateSubmitStatus() {
    this.submit.disabled = this.passengerGridService.rows.length > 0 ? false : true;
  }

  findPerson(natCode: any) {
    this.service.GetPerson(natCode.value).subscribe(
      person => {
        person.isEditable = false;
        const team = new TeamMember();
        team.person = person;
        this.buyerForm.updateForm(team);
        this.buyerForm.disableControl(true, this.disablingItems);
      },
      () => {
        const teamMember = new TeamMember();
        //we use Object.assign cos last data remained in form by using dynamic cast.
        teamMember.person = new Person();
        teamMember.person.isEditable = true;
        teamMember.person.nationalCode = this.buyerForm.model.person.nationalCode;
        this.buyerForm.updateForm(teamMember);
        this.buyerForm.disableControl(false, this.disablingItems);
      });
  }

  nextStep(stepper: MatStepper) {
    if (stepper.selectedIndex == 0) {
      if (this.buyerForm.model.person.id === '')
        this.service.AddPerson(this.buyerForm.model.person).subscribe(x => {
          this.buyerForm.model.person = x;
          this.buyerForm.updateForm();
          this.nextButton.disabled = false;
          stepper.next();
        });
      else {
        this.nextButton.disabled = false;
        stepper.next();
      }
    }
    else {
      this.nextButton.disabled = true;
      stepper.next();
    }
  }

  previousStep(stepper: MatStepper) {
    stepper.previous();
    if (stepper.selectedIndex == 0) {
      this.nextButton.disabled = false;
    }
    else {
      this.nextButton.disabled = true;
    }
  }

  save() {
    if (this.passengerGridService.rows.length === 0)
      this.dialogInstance.close(this.passengerGridService.rows.length);
    else
      this.service.upsertTeam(this.buyerForm.model, this.passengerGridService.rows, this.data.model, this.teamId).subscribe(x => this.dialogInstance.close(this.passengerGridService.rows.length));
  }

  onPriceChange() {
    this.updateTotalPrice();
  }

  getTotal(members: TeamMember[]): number {

    let total = 0;
    this.infantCount = 0;
    this.noneOptionCount = 0;
    this.adultCount = 0;

    let noneOptionFoodCount = 0;
    let noneOptionRoomCount = 0;
    let noneOptionBusCount = 0;

    members.forEach(person => {

      if (person.person.isInfant)
        this.infantCount++;
      else if (person.person.isUnder5)
        this.noneOptionCount++;
      else
        this.adultCount++;

      if (!person.person.isInfant) {
        noneOptionFoodCount += person.personIncomes.some(x => x.optionType === OptionType.Food) ? 0 : 1;
        noneOptionRoomCount += person.personIncomes.some(x => x.optionType === OptionType.Room) ? 0 : 1;
        noneOptionBusCount += person.personIncomes.some(x => x.optionType === OptionType.Bus) ? 0 : 1;
      }
    });

    total += this.adultCount * this.data.model.basePrice;
    total += this.infantCount * this.data.model.infantPrice;
    total += this.noneOptionCount * this.data.model.basePrice;

    total -= noneOptionFoodCount * this.data.model.foodPrice;
    total -= noneOptionRoomCount * this.data.model.roomPrice;
    total -= noneOptionBusCount * this.data.model.busPrice;
    return total;
  }

  updateTotalPrice() {
    this.data.model.totalPrice = this.getTotal(this.passengerGridService.rows);
    this.data.updateForm(this.data.model);
  }

  updateCount() {
    this.getTotal(this.passengerGridService.rows);
  }
}
