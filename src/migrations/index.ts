import * as migration_20250929_080805_pages_blocks_hero_block_locales from './20250929_080805_pages_blocks_hero_block_locales';
import * as migration_20250929_081827_pages_blocks_hero_block_locales from './20250929_081827_pages_blocks_hero_block_locales';
import * as migration_20251001_033116_products from './20251001_033116_products';
import * as migration_20251001_033630_products from './20251001_033630_products';
import * as migration_20251001_033654_variants from './20251001_033654_variants';

export const migrations = [
  {
    up: migration_20250929_080805_pages_blocks_hero_block_locales.up,
    down: migration_20250929_080805_pages_blocks_hero_block_locales.down,
    name: '20250929_080805_pages_blocks_hero_block_locales',
  },
  {
    up: migration_20250929_081827_pages_blocks_hero_block_locales.up,
    down: migration_20250929_081827_pages_blocks_hero_block_locales.down,
    name: '20250929_081827_pages_blocks_hero_block_locales',
  },
  {
    up: migration_20251001_033116_products.up,
    down: migration_20251001_033116_products.down,
    name: '20251001_033116_products',
  },
  {
    up: migration_20251001_033630_products.up,
    down: migration_20251001_033630_products.down,
    name: '20251001_033630_products',
  },
  {
    up: migration_20251001_033654_variants.up,
    down: migration_20251001_033654_variants.down,
    name: '20251001_033654_variants'
  },
];
