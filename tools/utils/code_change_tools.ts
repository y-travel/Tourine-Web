import * as browserSync from 'browser-sync';
// import * as path from 'path';

import Config from '../config';

class ChangeFileManager {
  private _files: string[] = [];
  private _pristine = true;

  get lastChangedFiles() {
    return this._files.slice();
  }

  get pristine() {
    return this._pristine;
  }

  addFile(file: string) {
    this._pristine = false;
    this._files.push(file);
  }

  addFiles(files: string[]) {
    files.forEach(f => this.addFile(f));
  }

  clear() {
    this._files = [];
  }
}

export let changeFileManager = new ChangeFileManager();

/**
 * Runs BrowserSync as the listening process for the application.
 */
/**
 * Provides a flag to mark which files have changed and reloads BrowserSync accordingly.
 */
const changed = (files: any) => {
  if (!(files instanceof Array)) {
    files = [files];
  }
};

export { changed };
