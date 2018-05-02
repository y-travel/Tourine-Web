import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Tour } from '../../../@core/data/models/client.model';
import { NewFormService } from '../../../@core/data/form.service';
import { FormFactory } from '../../../@core/data/models/form-factory';
import { ValidationService } from '../../../@core/utils/validation.service';

@Injectable()
export class BlockUpsertViewModel {
  form: NewFormService<Tour>;
  tourId: string;

  constructor(private formFactory: FormFactory, private validation: ValidationService) {
  }

  get model(): Tour {
    return <Tour>this.form.value;
  }

  init(tourId: string, tour: Tour, isEdit = false) {
    this.tourId = tourId;
    if (!isEdit) {
      const tmp = new Tour();
      //initial block
      tmp.parentId = this.tourId;
      tmp.basePrice = tour.basePrice;
      tmp.infantPrice = tour.infantPrice;
      tour = tmp;
    }
    this.form = this.createBlockForm(tour);
  }

  updateForm(model?: any) {
    this.form.updateForm(model);
  }

  isValid(step?: number) {
    switch (step) {
      case 0: {
        const agencyIdControl = this.form.controls['agencyId'];
        this.form.markTouch(agencyIdControl);
        return agencyIdControl.valid;
      }
      default: {
        return this.form.validate();
      }
    }
  }

//@TODO 1: to be merge with tour
  private createBlockForm(model: Tour = new Tour()): NewFormService<Tour> {
    const form = new FormBuilder().group({
      id: [model.id],
      parentId: [model.parentId],
      agencyId: [model.agencyId, Validators.required],
      capacity: [model.capacity ? model.capacity : undefined, [Validators.required, Validators.min(1)]],
      infantPrice: [model.infantPrice ? model.infantPrice : undefined, Validators.required],
      basePrice: [model.basePrice ? model.basePrice : undefined, Validators.required],
      options: new FormBuilder().array(
        (model.options ? model.options : new Tour().options)
          .map(x => this.formFactory.createTourOptionForm(model.id, x)) //@TODO find a good solution for initializing options
      ),
      isBlock: true,
    });
    return new NewFormService<Tour>(form, this.validation);
  }

}
