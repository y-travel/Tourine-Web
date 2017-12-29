import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class MenuService {
  onClick = new EventEmitter<string>();

  navigateHome() {
    //@TODO impl.
  }
}
