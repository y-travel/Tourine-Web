import { join } from 'path';

import { BUILD_TYPES, SeedConfig } from './seed.config';

export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks');
  SyncPath = join(process.env.SyncBuildPath, 'app');
  SERVER_SRC = join(this.PROJECT_ROOT, '../Tourine/app');
  isDevelopment = () => this.BUILD_TYPE === BUILD_TYPES.DEVELOPMENT;

  constructor() {
    super();
    this.APP_BASE = '/app/';
  }
}
