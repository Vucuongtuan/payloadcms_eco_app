import * as migration_20250818_095017 from './20250818_095017';

export const migrations = [
  {
    up: migration_20250818_095017.up,
    down: migration_20250818_095017.down,
    name: '20250818_095017'
  },
];
