import { Component, Inject, ViewChild } from '@angular/core';
import { DialogService } from '../../../@core/utils/dialog.service';
import { MAT_DIALOG_DATA, MatButton, MatDialogRef, MatStepper } from '@angular/material';
import { FormService, NewFormService } from '../../../@core/data/form.service';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { PassengerGridService } from '../../tour/passenger-grid.service';
import { FormFactory } from '../../../@core/data/models/form-factory';
import { OptionType, Passenger, Person } from '../../../@core/data/models';
import { ToolbarItem } from '../../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';
import { PersonService } from '../../../@core/data/person.service';
import { TourService } from '../../../@core/data/tour.service';
import { DialogButtonType, DialogMode } from '../../../@core/data/models/enums';
import { AlertDialogData } from '../../../@theme/components/dialog/dialog.component';
import { Block } from '../../../@core/data/models/client.model';
import { Serializable } from '../../../@core/utils/serializable';
import { PassengerUpsertComponent } from '../passenger-upsert/passenger-upsert.component';


@Component({
  selector: 'trn-passenger-register',
  templateUrl: './passenger-register.component.pug',
  styleUrls: ['./passenger-register.component.scss'],
  providers: [PassengerGridService]
})
export class PassengerRegisterComponent implements ModalInterface {

  dialogMode: DialogMode;
  isBuyerAsPassenger = true;

  @ViewChild('nextButton') nextButton: MatButton;
  @ViewChild('submit') submit: MatButton;

  toolbarItems: ToolbarItem[] = [
    <ToolbarItem>{
      icon: 'delete',
      title: 'delete',
      color: '#f44336',
      alertData: new AlertDialogData('msg.delete', undefined, 'delete', DialogButtonType.Negative),
      command: (teamMember) => this.teamMemberDelete(teamMember),
    },
    <ToolbarItem>{
      icon: 'mode_edit',
      title: 'edit',
      color: '#03a9f4',
      command: (teamMember) => this.teamMemberUpsert(teamMember, false),
    },
  ];

  tourFreeSpace = 0;
  totalPrice: number;
  infantCount = 0;
  adultCount = 0;
  noneOptionCount = 0;
  rows: any[];
  teamId: string = undefined;
  buyerForm: NewFormService<Person>;
  blockForm: FormService<Block>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogInstance: MatDialogRef<ModalInterface>,
              private dialogService: DialogService,
              public formFactory: FormFactory,
              public passengerGridService: PassengerGridService,
              public personService: PersonService,
              public tourService: TourService) {
  }


  initDialog() {
    this.buyerForm = this.formFactory.createPersonForm(this.data.buyer);
    this.teamId = this.data.teamId;
    this.blockForm = this.formFactory.createAddPassengersForm(this.data.block);
    if (this.blockForm.model.parentId) {
      this.blockForm.disableControl(true, ['basePrice', 'infantPrice']);
    }
    this.passengerGridService.initToolbar(this.toolbarItems);
    this.tourService.getTourFreeSpace(this.blockForm.model.id).subscribe(x => this.tourFreeSpace = +x);
    this.tourService.getTourOptions(this.blockForm.model.id).subscribe(tourOptions => {
      this.blockForm.model.foodPrice = tourOptions.find(y => y.optionType === OptionType.Food).price;
      this.blockForm.model.roomPrice = tourOptions.find(y => y.optionType === OptionType.Room).price;
      this.blockForm.model.busPrice = tourOptions.find(y => y.optionType === OptionType.Bus).price;
    });
    if (this.data.buyer) {
      this.buyerForm.updateForm(this.data.buyer);
    }
  }

  teamMemberDelete(teamMember: Passenger) {
    this.passengerGridService.remove(teamMember);
    this.tourFreeSpace++;
    this.updateTotalPrice();
  }

  teamMemberUpsert(teamMember: Passenger = new Passenger(), isAdd: boolean = true) {
    if (this.tourFreeSpace <= 0 && isAdd) {
      this.dialogService.openDialog('msg.thereIsNoFreeSpace');
      return;
    }
    const inst = this.dialogService.openPopup(PassengerUpsertComponent, this.formFactory.createTeamMemberForm(teamMember));
    inst.afterClosed().subscribe(x => {
      if (x == null || x === '') {
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

  nextStep(stepper: MatStepper) {
    if (stepper.selectedIndex === 0) {
      if (this.buyerForm.value.id === null) {
        if (!this.buyerForm.valid) {
          stepper.next();
        } else {
          this.personService.AddPerson(this.buyerForm.value).subscribe(x => {
            this.buyerForm.updateForm(x);
            this.nextButton.disabled = false;

            if (x.isInfant) {
              this.dialogService.openDialog('msg.buyerCannotBeInfant');
            }
            if (x.isUnder5) {
              this.dialogService.openDialog('msg.buyerCannotBeUnder5');
            } else {
              stepper.next();
            }
          });
        }
      } else {
        if (this.buyerForm.value.isInfant) {
          this.dialogService.openDialog('msg.buyerCannotBeInfant');
        } else if (this.buyerForm.value.isUnder5) {
          this.dialogService.openDialog('msg.buyerCannotBeUnder5');
        } else {
          if (this.buyerForm.valid) {
            this.nextButton.disabled = false;
            stepper.next();
            if (this.isBuyerAsPassenger) {
              const passenger = new Passenger();
              passenger.person = Serializable.fromJSON(passenger.person, this.buyerForm.value);
              passenger.personId = this.buyerForm.value.id;
              this.teamMemberUpsert(passenger, true);
            }
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
    this.isBuyerAsPassenger = false;
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
      this.personService.upsertTeam(this.buyerForm.value, this.passengerGridService.rows, this.blockForm.model, this.teamId).subscribe(x => {
        this.dialogInstance.close(this.passengerGridService.rows.length);
      });
    }
  }

  onPriceChange() {
    this.updateTotalPrice();
  }

  getTotal(members: Passenger[]): number {

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
        noneOptionFoodCount += OptionType.hasFlag(person.optionType, OptionType.Food) ? 0 : 1;
        noneOptionRoomCount += OptionType.hasFlag(person.optionType, OptionType.Room) ? 0 : 1;
        noneOptionBusCount += OptionType.hasFlag(person.optionType, OptionType.Bus) ? 0 : 1;
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
