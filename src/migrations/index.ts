import * as migration_20251001_105927_products from './20251001_105927_products';
import * as migration_20251001_152432_categories from './20251001_152432_categories';

export const migrations = [
  {
    up: migration_20251001_105927_products.up,
    down: migration_20251001_105927_products.down,
    name: '20251001_105927_products',
  },
  {
    up: migration_20251001_152432_categories.up,
    down: migration_20251001_152432_categories.down,
    name: '20251001_152432_categories'
  },
];
