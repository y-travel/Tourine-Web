import { InjectionToken } from '@angular/core';

export enum TourStatus { Create = 1, Running = 2, End = 3 }

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD';

export enum OptionType {
  Empty = 0,
  Room = 1,
  Bus = 2,
  Food = 4,
}

export namespace OptionType {
  export function getAll() {
    return OptionType.Room | OptionType.Bus | OptionType.Food;
  }

  export function hasFlag(source: OptionType, expectedOption: OptionType): boolean {
    return (source & expectedOption) > 0;
  }
}

export enum IncomeStatus {
  Settled = 1,
  Unsettled = 2,
}

export enum OptionStatus {
  Limited = 1,
  Unlimited = 2,
}

export enum DialogMode {Create = 1, Edit = 2, View = 3}

export enum PersonType {
  Passenger = 1,
  Customer = 2,
  Leader = 4,
}

export enum DialogType {
  Info = 0,
  Warning = 1,
  Error = 2,
  Success = 3
}

export enum DialogButtonType {
  Positive = 0,
  Negative = 1,
  Neutral = 2,
}

export enum ReportType {
  TourPassenger = 1,
  Ticket = 2,
  Visa = 3
}

// cos: we can't access enums inside html files
export class EnumsDefinition {
  DialogMode = DialogMode;
  OptionStatus = OptionStatus;
  IncomeStatus = IncomeStatus;
  PersonType = PersonType;
  TourStatus = TourStatus;
  OptionType = OptionType;
  DialogButtonType = DialogButtonType;
}

export const ENUMS = new InjectionToken<EnumsDefinition>('enums');

export const ENUMS_INSTANCE = new EnumsDefinition();
