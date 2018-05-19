import { Injectable } from '@angular/core';

@Injectable()
export class FormatterService {
  //@TODO inject locales

  locales = 'fa-IR';

  constructor() {
  }

  getDateFormat = (date: string) => new Date(date).toLocaleString(this.locales, { year: 'numeric', month: '2-digit', day: '2-digit' });

  getPriceFormat = (price: number) => !isNaN(price) ? Intl.NumberFormat(this.locales).format(price) : 'withOutPrice';
}
