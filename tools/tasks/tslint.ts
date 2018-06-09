import { config } from '../config';

export = () => {
  const {spawnSync} = require('child_process');
  const result = spawnSync('ng.cmd', [
    'lint',
  ], {stdio: 'inherit'});
  if (result.status !== 0 && !config.isDevelopment()) {
    process.exit(1);
  }
};
