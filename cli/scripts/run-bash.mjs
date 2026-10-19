#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { platform } from 'node:os';
import { existsSync } from 'node:fs';

function getBashCmd() {
  if (platform() === 'win32') {
    const gitBashPaths = [
      'C:\\Program Files\\Git\\bin\\bash.exe',
      'C:\\Program Files\\Git\\usr\\bin\\bash.exe',
      'C:\\Program Files (x86)\\Git\\bin\\bash.exe',
      process.env.LOCALAPPDATA + '\\Programs\\Git\\bin\\bash.exe',
    ];
    for (const p of gitBashPaths) {
      if (p && existsSync(p)) return p;
    }
  }
  return 'bash';
}

const cmd = getBashCmd();
const args = process.argv.slice(2);

const result = spawnSync(cmd, args, {
  stdio: 'inherit',
  cwd: process.cwd()
});

if (result.error) {
  console.error(`Failed to start ${cmd}: ${result.error.message}`);
  process.exit(1);
}
process.exit(result.status ?? 0);
