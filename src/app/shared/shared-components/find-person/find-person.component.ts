import { Component, Input, OnInit } from '@angular/core';

import { NewFormService } from '../../../@core/data/form.service';
import { Person } from '../../../@core/data/models';
import { DialogMode } from '../../../@core/data/models/enums';
import { PersonUpsertComponent } from '../../../pages/person/person-upsert/person-upsert.component';
import { DialogService } from '../../../@core/utils/dialog.service';
import { PersonService } from '../../../@core/data/person.service';


declare type iconKind = 'search' | 'edit' | 'person_add';

@Component({
  selector: 'trn-find-person',
  templateUrl: './find-person.component.gen.html',
  styleUrls: ['./find-person.component.scss']
})
export class FindPersonComponent implements OnInit {

  dialogMode: DialogMode;
  icon: iconKind = 'search';
  model: any;
  readOnly: Boolean = false;

  @Input() personForm: NewFormService<Person>;

  constructor(private dialogService: DialogService,
              private personService: PersonService) {
  }


  ngOnInit() {
    if (this.personForm.status === 'VALID') {
      this.find(this.personForm.value.nationalCode);
      this.readOnly = true;
    }
  }


  Upsert(isEdit) {
    const ref = this.dialogService.openPopup(PersonUpsertComponent, this.personForm.value, isEdit === 'edit' ? DialogMode.Edit : DialogMode.Create);
    ref.afterClosed().subscribe(newPerson => {
      // @todo check
      if (newPerson == null || newPerson === '') {
        return;
      }
      this.personForm.updateForm(newPerson);
      this.icon = 'edit';
    });
  }

  doAction(nationalCode: any, action: iconKind) {
    if (action === 'search') {
      this.find(nationalCode);
    } else {
      this.Upsert(action);
    }
  }

  find(nationalCode: any) {
    this.personForm.markAllFieldAsTouch();
    if (!this.personForm.get('nationalCode').valid) {
      return;
    }
    this.personService.GetPerson(nationalCode).subscribe(
      person => {
        this.icon = nationalCode !== '' ? 'edit' : 'search';
        this.personForm.updateForm(person);
      },
      () => {
        this.icon = 'person_add';
        this.personForm.reset({nationalCode: nationalCode});
      });
  }

  inputChanage(nationalCode) {
    this.icon = 'search';
    this.personForm.reset({nationalCode: nationalCode});
  }

}
