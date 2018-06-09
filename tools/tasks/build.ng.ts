import Config from '../config';

export = () => {
  const {spawnSync} = require('child_process');
  const result = spawnSync('ng.cmd', [
    'build',
    !Config.isDevelopment() ? '--prod' : '',
    !Config.isDevelopment() ? '--build-optimizer=true' : '',
  ], {stdio: 'inherit'});
  if (result.status !== 0) {
    process.exit(1);
  }
};
