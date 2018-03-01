import { join } from 'path';

import { SeedConfig } from './seed.config';

export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks');
  SyncPath = `${this.APP_SRC}/../.sync/website/`;

  constructor() {
    super();
    this.APP_BASE = "/app/";
  }

}
