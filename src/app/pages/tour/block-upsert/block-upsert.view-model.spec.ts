import { TestBed } from '@angular/core/testing';

import { BlockUpsertViewModel } from './block-upsert.view-model';
import { ValidationService } from '../../../@core/utils/validation.service';
import { FormFactory } from '../../../@core/data/models/form-factory';
import { Block, Tour } from '../../../@core/data/models/client.model';
import { UTILS, UTILS_INSTANCE } from '../../../@core/utils';

class ValidationServiceStub {
  update() {
  }
}

fdescribe('BlockUpsertViewModel', () => {
  let vModel: BlockUpsertViewModel;
  const defaultTour: any = {basePrice: 10, capacity: 10, freeSpace: 10};
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BlockUpsertViewModel,
        FormFactory,
        {provide: ValidationService, useClass: ValidationServiceStub},
        {provide: UTILS, useValue: UTILS_INSTANCE},
      ]
    });
    vModel = TestBed.get(BlockUpsertViewModel);
  });
  it('مبلغ رزرو نباید از مبلغ تور کمتر باشد.', () => {
    // create mode
    vModel.init(<Tour>defaultTour);
    vModel.updateForm(<Tour>{basePrice: 9});
    expect(vModel.form.get('basePrice').invalid).toBeTruthy();

    // edit mode
    vModel.init(<Tour>defaultTour, <Block>defaultTour);
    vModel.updateForm(<Tour>{basePrice: 9});
    expect(vModel.form.get('basePrice').invalid).toBeTruthy();
  });

   it('مبلغ رزرو باید بیشتر از مبلغ تور باشد.', () => {
    // create
    vModel.init(<Tour>defaultTour);
    vModel.updateForm(<Tour>{basePrice: 11});
    expect(vModel.form.get('basePrice').valid).toBeTruthy();

    // edit
    vModel.init(<Tour>defaultTour, <Block>defaultTour);
    vModel.updateForm(<Tour>{basePrice: 11});
    expect(vModel.form.get('basePrice').valid).toBeTruthy();
  });

  it('تعداد مسافران نباید بیشتر از ظرفیت تور باشد.', () => {
    //create
    vModel.init(<Tour>defaultTour);
    vModel.updateForm(<Tour>{capacity: 11});
    expect(vModel.form.get('capacity').invalid).toBeTruthy();
    //edit
    vModel.init(<Tour>defaultTour, <Block>defaultTour);
    vModel.updateForm(<Tour>{capacity: 11});
    expect(vModel.form.get('capacity').invalid).toBeTruthy();
  });

  it('تعداد مسافران باید بتواند تا حداکثر ظرفیت خالی تور باشد.', () => {
    //create
    vModel.init(<Tour>defaultTour);
    vModel.updateForm(<Tour>{capacity: 10});
    expect(vModel.form.get('capacity').valid).toBeTruthy();
    //edit
    vModel.init(<Tour>defaultTour, <Block>defaultTour);
    vModel.updateForm(<Tour>{capacity: 10});
    expect(vModel.form.get('capacity').valid).toBeTruthy();
  });

  it('تعداد مسافران نباید کمتر از صفر باشد.', () => {
    //create
    vModel.init(<Tour>defaultTour);
    vModel.updateForm(<Tour>{capacity: -1});
    expect(vModel.form.get('capacity').invalid).toBeTruthy();

    //edit
    vModel.init(<Tour>defaultTour, <Block>defaultTour);
    vModel.updateForm(<Tour>{capacity: -1});
    expect(vModel.form.get('capacity').invalid).toBeTruthy();
  });

  it('اگر تور تعریف نشده باشد باید ارور ارسال شود.', () => {
    expect(() => {
      vModel.init(undefined);
    }).toThrow();
  });
});

