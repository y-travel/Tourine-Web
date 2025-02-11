import { Injectable } from '@angular/core';

/**
 * Service to control the global page spinner.
 */
@Injectable()
export class SpinnerService {

  private loaders: Promise<any>[] = [];
  private selector = 'nb-global-spinner';

  /**
   * Appends new loader to the list of loader to be completed before
   * spinner will be hidden
   * @param method Promise<any>
   */
  registerLoader(method: Promise<any>): void {
    this.loaders.push(method);
  }

  /**
   * Clears the list of loader
   */
  clear(): void {
    this.loaders = [];
  }

  /**
   * Start the loader process, show spinner and execute loaders
   */
  load(): void {
    this.showSpinner();
    this.executeAll();
  }

  // TODO is there any better way of doing this?
  showSpinner(): void {
    const el = this.getSpinnerElement();
    if (el) {
      el.style['display'] = 'block';
    }
  }

  hideSpinner(): void {
    const el = this.getSpinnerElement();
    if (el) {
      el.style['display'] = 'none';
    }
  }

  private executeAll(done = () => {
  }): void {
    Promise.all(this.loaders).then((values) => {
      this.hideSpinner();
      done.call(null, values);
    })
      .catch((error) => {
        // TODO: Promise.reject
        console.error(error);
      });
  }

  private getSpinnerElement() {
    return document.getElementById(this.selector);
  }
}
