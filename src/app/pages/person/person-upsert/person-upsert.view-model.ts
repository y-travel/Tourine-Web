import { Inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
//
import { Person } from '../../../@core/data/models/client.model';
import { NewFormService } from '../../../@core/data/form.service';
import { ValidationService } from '../../../@core/utils/validation.service';
import { APP_CONFIG, AppConfig } from '../../../@core/utils/app.config';
import { PersonService } from '../../../@core/data/person.service';

@Injectable()
export class PersonUpsertViewModel {
  form: NewFormService<Person>;

  constructor(private validationService: ValidationService,
              public personService: PersonService,
              @Inject(APP_CONFIG) private config: AppConfig) {
  }

  get model(): Person {
    return <Person>this.form.value;
  }

  init(model?: Person, isEdit = false) {
    this.form = this.createAddLeaderForm(model);
  }

  isValid() {
    if (this.form.valid) {
      return true;
    }
    this.form.markAllFieldAsTouch();
    return false;
  }

  findPerson(nationalCode: string) {
    this.personService.GetPerson(nationalCode)
      .subscribe(person => this.form.updateForm(person),
        () => this.form.restoreSnapshot(<Person>{nationalCode: nationalCode}));
  }

  updatePersonAge(birthDate: Date) {
    const now = new Date();
    const born = new Date(birthDate);
    const age = Math.floor((now.getTime() - born.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

    this.form.updateForm(<Person>{isInfant: age < 2, isUnder5: age >= 2 && age < 5});
  }

  createAddLeaderForm(model = <Person>{}): NewFormService<Person> {
    const form = new FormBuilder().group({
      id: [model.id || '0'],
      name: [model.name, [Validators.required, Validators.minLength(2)]],
      family: [model.family, [Validators.required, Validators.minLength(2)]],
      englishName: [model.englishName, [Validators.required, Validators.minLength(2)]],
      englishFamily: [model.englishFamily, [Validators.required, Validators.minLength(2)]],
      nationalCode: [model.nationalCode, [Validators.required, Validators.minLength(this.config.isDev() ? 1 : 10)]],
      gender: [model.gender || true],
      mobileNumber: [model.mobileNumber, [Validators.required, Validators.minLength(11)]],
      birthDate: [model.birthDate, Validators.required],
      passportExpireDate: [model.passportExpireDate],
      passportNo: [model.passportNo],
      socialNumber: [model.socialNumber],
    });
    return new NewFormService<Person>(form, this.validationService);
  }
}
