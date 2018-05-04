import Config from '../config';

export = () => {
  const {spawnSync} = require('child_process');
  spawnSync('ng.cmd', [
    'build',
    '--aot',
    '--no-sourcemap', !Config.isDevelopment() ? '--prod' : '',
    !Config.isDevelopment() ? '--build-optimizer=true' : '',
  ], {stdio: 'inherit'});
};
