import * as migration_20251001_105927_products from './20251001_105927_products';
import * as migration_20251001_152432_categories from './20251001_152432_categories';
import * as migration_20251002_072531_header_rels from './20251002_072531_header_rels';
import * as migration_20251002_103521_pages from './20251002_103521_pages';

export const migrations = [
  {
    up: migration_20251001_105927_products.up,
    down: migration_20251001_105927_products.down,
    name: '20251001_105927_products',
  },
  {
    up: migration_20251001_152432_categories.up,
    down: migration_20251001_152432_categories.down,
    name: '20251001_152432_categories',
  },
  {
    up: migration_20251002_072531_header_rels.up,
    down: migration_20251002_072531_header_rels.down,
    name: '20251002_072531_header_rels',
  },
  {
    up: migration_20251002_103521_pages.up,
    down: migration_20251002_103521_pages.down,
    name: '20251002_103521_pages'
  },
];
