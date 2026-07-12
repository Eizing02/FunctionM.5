const { spawnSync } = require('node:child_process');
const path = require('node:path');

if (process.platform !== 'win32') {
  process.exit(0);
}

const scriptPath = path.join(__dirname, 'install-impeccable-unzip-shim.ps1');
const result = spawnSync(
  'powershell',
  ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', scriptPath],
  { stdio: 'inherit' },
);

process.exit(result.status ?? 0);
