import { Injectable } from '@angular/core';
import { Agency, Block } from '../../../@core/data/models/client.model';
import { NewFormService } from '../../../@core/data/form.service';
import { FormFactory } from '../../../@core/data/models/form-factory';
import { FormBuilder, Validators } from '@angular/forms';

class ModelType {
  block = new Block();
  agency = new Agency();
}

@Injectable()
export class BlockUpsertViewModel {
  type: { block: Block };
  form: NewFormService<Block>;

  constructor(private formFactory: FormFactory) {
  }

  get model(): Block {
    return <Block>this.form.value;
  }

  init(block?: Block, isEdit = false) {
    if (!isEdit)
      block.agencyId = '';
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

  private createBlockForm(model: Block = new Block()): NewFormService<Block> {
    const form = new FormBuilder().group({
      id: [model.id],
      parentId: [model.parentId],
      agencyId: [model.agencyId, Validators.required],
      capacity: [model.capacity ? model.capacity : undefined, [Validators.required, Validators.min(1)]],
      infantPrice: [model.infantPrice ? model.infantPrice : undefined, Validators.required],
      busPrice: [model.busPrice ? model.busPrice : undefined, Validators.required],
      roomPrice: [model.roomPrice ? model.roomPrice : undefined, Validators.required],
      foodPrice: [model.foodPrice ? model.foodPrice : undefined, Validators.required],
      basePrice: [model.basePrice ? model.basePrice : undefined, Validators.required],
      totalPrice: [model.totalPrice ? model.totalPrice : 0]
    });
    return new NewFormService(Block, form);
  }

}
