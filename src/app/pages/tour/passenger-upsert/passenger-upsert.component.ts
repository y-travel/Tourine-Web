import { Component, Inject, ViewChild } from '@angular/core';
import { DialogService, ModalInterface } from '../../../@core/utils/dialog.service';
import { MAT_DIALOG_DATA, MatButton, MatDialogRef, MatStepper } from '@angular/material';
import { FormService, NewFormService } from '../../../@core/data/form.service';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { PassengerGridService } from '../passenger-grid.service';
import { FormFactory } from '../../../@core/data/models/form-factory';
import { OptionType, Person, TeamMember } from '../../../@core/data/models';
import { TeamMemberUpsertComponent } from '../team-member-upsert/team-member-upsert.component';
import { ToolbarItem } from '../../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';
import { PersonService } from '../../../@core/data/person.service';
import { DialogButtonType, DialogMode } from '../../../@core/data/models/enums';
import { AlertDialogData } from '../../../@theme/components/dialog/dialog.component';
import { Block } from '../../../@core/data/models/client.model';

@Component({
  selector: 'trn-passenger-upsert',
  templateUrl: './passenger-upsert.component.gen.html',
  styleUrls: ['./passenger-upsert.component.scss'],
  providers: [PassengerGridService]
})
export class PassengerUpsertComponent implements ModalInterface {

  dialogMode: DialogMode;

  @ViewChild('nextButton') nextButton: MatButton;
  @ViewChild('submit') submit: MatButton;
  disablingItems = ['name', 'family', 'mobileNumber', 'gender', 'englishName', 'englishFamily', 'birthDate'];

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
        this.teamMemberUpsert(teamMember, false);
      },
    },
  ];

  tourFreeSpace = 0;
  totalPrice: number;
  infantCount = 0;
  adultCount = 0;
  noneOptionCount = 0;
  rows: any[];
  teamId: string = undefined;
  isEditable = true;
  buyerForm: NewFormService<Person>;
  blockForm: FormService<Block>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogInstance: MatDialogRef<ModalInterface>,
              private dialogService: DialogService,
              public formFactory: FormFactory,
              public passengerGridService: PassengerGridService,
              public service: PersonService) {
  }

  initDialog() {
    this.buyerForm = this.formFactory.createPersonForm(this.data.buyer);
    this.teamId = this.data.teamId;
    this.blockForm = this.formFactory.createAddPassengersForm(this.data.block);
    if (this.blockForm.model.parentId) {
      this.blockForm.disableControl(true, ['basePrice', 'infantPrice']);
    }
    this.buyerForm.disableControl(true, this.disablingItems);
    this.passengerGridService.initToolbar(this.toolbarItems);
    this.service.getTourFreeSpace(this.blockForm.model.id).subscribe(x => this.tourFreeSpace = +x);
    this.service.getTourOptions(this.blockForm.model.id).subscribe(x => {
      this.blockForm.model.foodPrice = x.find(y => y.optionType === OptionType.Food).price;
      this.blockForm.model.roomPrice = x.find(y => y.optionType === OptionType.Room).price;
      this.blockForm.model.busPrice = x.find(y => y.optionType === OptionType.Bus).price;
    });
  }

  teamMemberDelete(teamMember: TeamMember) {
    this.passengerGridService.remove(teamMember);
    this.tourFreeSpace++;
    this.updateTotalPrice();
  }

  teamMemberUpsert(teamMember: TeamMember = new TeamMember(), isAdd: boolean = true) {
    if (this.tourFreeSpace <= 0 && isAdd) {
      this.dialogService.openDialog('msg.thereIsNoFreeSpace', null);
      return;
    }
    const inst = this.dialogService.openPopup(TeamMemberUpsertComponent, this.formFactory.createTeamMemberForm(teamMember));
    inst.afterClosed().subscribe(x => {
      if (x == null) {
        return;
      }
      if (isAdd || (!isAdd && teamMember.person.id === x.person.id)) {
        this.passengerGridService.addItem(x);
        this.tourFreeSpace--;
      }
      //@TODO: update to a new person
      this.updateTotalPrice();
    });
  }

  findPerson(natCode: any) {
    this.service.GetPerson(natCode.value).subscribe(
      person => {
        this.buyerForm.updateForm(person);
        this.buyerForm.disableControl(true, this.disablingItems);
      },
      () => {
        //we use Object.assign cos last data remained in form by using dynamic cast.
        const person = <Person>{};
        person.nationalCode = this.buyerForm.value.nationalCode;
        this.buyerForm.updateForm(person);
        this.buyerForm.disableControl(false, this.disablingItems);
      });
  }

  nextStep(stepper: MatStepper) {
    if (stepper.selectedIndex === 0) {
      if (this.buyerForm.value.id === null) {
        if (!this.buyerForm.valid) {
          stepper.next();
        } else {
          this.service.AddPerson(this.buyerForm.value).subscribe(x => {
            this.buyerForm.updateForm(x);
            this.buyerForm.disableControl(false, this.disablingItems);
            this.nextButton.disabled = false;

            if (x.isInfant) {
              this.dialogService.openDialog('msg.buyerCannotBeInfant', null);
            }
            if (x.isUnder5) {
              this.dialogService.openDialog('msg.buyerCannotBeUnder5', null);
            } else {
              stepper.next();
            }
          });
        }
      } else {
        if (this.buyerForm.value.isInfant) {
          this.dialogService.openDialog('msg.buyerCannotBeInfant', null);
        } else if (this.buyerForm.value.isUnder5) {
          this.dialogService.openDialog('msg.buyerCannotBeUnder5', null);
        } else {
          if (this.buyerForm.valid) {
            this.nextButton.disabled = false;
            stepper.next();
          }
        }
      }
    } else {
      this.nextButton.disabled = true;
      stepper.next();
    }
  }

  previousStep(stepper: MatStepper) {
    stepper.previous();
    if (stepper.selectedIndex === 0) {
      this.nextButton.disabled = false;
    } else {
      this.nextButton.disabled = true;
    }
  }

  save() {
    if (this.passengerGridService.rows.length === 0) {
      this.dialogInstance.close(this.passengerGridService.rows.length);
    } else {
      this.service.upsertTeam(this.buyerForm.value, this.passengerGridService.rows, this.blockForm.model, this.teamId).subscribe(x => {
        this.dialogInstance.close(this.passengerGridService.rows.length);
      });
    }
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

      if (person.person.isInfant) {
        this.infantCount++;
      } else if (person.person.isUnder5) {
        this.noneOptionCount++;
      } else {
        this.adultCount++;
      }

      if (!person.person.isInfant) {
        noneOptionFoodCount += person.personIncomes.some(x => x.optionType === OptionType.Food) ? 0 : 1;
        noneOptionRoomCount += person.personIncomes.some(x => x.optionType === OptionType.Room) ? 0 : 1;
        noneOptionBusCount += person.personIncomes.some(x => x.optionType === OptionType.Bus) ? 0 : 1;
      }
    });

    total += this.adultCount * this.blockForm.model.basePrice;
    total += this.infantCount * this.blockForm.model.infantPrice;
    total += this.noneOptionCount * this.blockForm.model.basePrice;

    total -= noneOptionFoodCount * this.blockForm.model.foodPrice;
    total -= noneOptionRoomCount * this.blockForm.model.roomPrice;
    total -= noneOptionBusCount * this.blockForm.model.busPrice;
    return total;
  }

  updateTotalPrice() {
    this.blockForm.model.totalPrice = this.getTotal(this.passengerGridService.rows);
    this.blockForm.updateForm(this.blockForm.model);
  }

  updateCount() {
    this.getTotal(this.passengerGridService.rows);
  }
}
