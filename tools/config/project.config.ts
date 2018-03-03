import { join } from 'path';

import { SeedConfig } from './seed.config';

export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks');
 //@TODO get path from environment var
  SyncPath = `${this.APP_SRC}/../.sync/website/`;

  constructor() {
    super();
    this.APP_BASE = "/app/";
  }

}
