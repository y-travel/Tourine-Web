import { Inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Block, Tour } from '../../../@core/data/models/client.model';
import { NewFormService } from '../../../@core/data/form.service';
import { FormFactory } from '../../../@core/data/models/form-factory';
import { ValidationService } from '../../../@core/utils/validation.service';
import { AppUtils, UTILS } from '../../../@core/utils';

@Injectable()
export class BlockUpsertViewModel {
  form: NewFormService<Tour>;
  parentBlock: Tour;
  freeSpace: number;
  isEdit: boolean;

  constructor(private formFactory: FormFactory,
              private validation: ValidationService,
              @Inject(UTILS) private utils: AppUtils) {
  }

  get model(): Tour {
    return <Tour>this.form.value;
  }

  init(tour: Tour, block?: Block) {
    if (this.utils.isNullOrUndefined(tour)) {
      throw new Error('tour is undefined');
    }
    this.parentBlock = tour;
    this.isEdit = !this.utils.isNullOrUndefined(block);
    this.freeSpace = this.parentBlock.freeSpace + (this.isEdit ? block.capacity : 0);
    if (!this.isEdit) {
      block = new Block();
      //initial block
      block.parentId = this.parentBlock.id;
      block.basePrice = tour.basePrice;
      block.infantPrice = tour.infantPrice;
    }
    this.form = this.createBlockForm(block);
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
  private createBlockForm(model: Block = new Block()): NewFormService<Tour> {
    const form = new FormBuilder().group({
      id: [model.id],
      parentId: [model.parentId],
      agencyId: [model.agencyId, Validators.required],
      capacity: [model.capacity || undefined,
        [Validators.required,
          Validators.min(1),
          Validators.max(this.freeSpace)]
      ],
      // @TODO Create maxOrEqual validator
      infantPrice: [model.infantPrice || undefined, Validators.required],
      basePrice: [model.basePrice || undefined, [Validators.required, Validators.min(this.parentBlock.basePrice)]],
      options: new FormBuilder().array(
        (model.options || new Tour().options)
          .map(x => this.formFactory.createTourOptionForm(model.id, x)) //@TODO find a good solution for initializing options
      ),
      isBlock: true,
    });
    return new NewFormService<Tour>(form, this.validation);
  }

}
