import { Injectable } from '@angular/core';
import { NewFormService } from '../../../@core/data/form.service';
import { Tour } from '../../../@core/data/models/client.model';
import { FormFactory } from '../../../@core/data/models/form-factory';

@Injectable()
export class TourUpsertViewModel {
  form: NewFormService<Tour>;

  constructor(private formFactory: FormFactory) {
  }

  get model(): Tour {
    return <Tour>this.form.value;
  }

  init(tour: Tour) {
    this.form = this.formFactory.createTourForm(tour);
  }
}
