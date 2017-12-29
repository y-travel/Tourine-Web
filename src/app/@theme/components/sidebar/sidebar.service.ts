import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  toggleChange = new EventEmitter<boolean>();

  constructor() {
  }

  toggle(open: boolean, name: string) {
    this.toggleChange.emit(open);
  }
}
