import * as migration_20250929_080805_pages_blocks_hero_block_locales from './20250929_080805_pages_blocks_hero_block_locales';
import * as migration_20250929_081827_pages_blocks_hero_block_locales from './20250929_081827_pages_blocks_hero_block_locales';

export const migrations = [
  {
    up: migration_20250929_080805_pages_blocks_hero_block_locales.up,
    down: migration_20250929_080805_pages_blocks_hero_block_locales.down,
    name: '20250929_080805_pages_blocks_hero_block_locales',
  },
  {
    up: migration_20250929_081827_pages_blocks_hero_block_locales.up,
    down: migration_20250929_081827_pages_blocks_hero_block_locales.down,
    name: '20250929_081827_pages_blocks_hero_block_locales'
  },
];
