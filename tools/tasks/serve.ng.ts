import { config } from '../config';

export = () => {
  const {spawnSync} = require('child_process');
  spawnSync('ng.cmd', [
    'serve',
    `--port=${config.PORT}`,
    '--open',
    '--proxy-config',
    'proxy.conf.json',
  ], {stdio: 'inherit'});
};
