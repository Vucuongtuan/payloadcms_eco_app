import { CollectionConfig } from 'payload';

import { baseField } from '../../customFields/baseField';

export const Categories: CollectionConfig = {
  slug: "category",
  folders: true,
  labels: {
    singular: {
      en: "Category",
      vi: "Danh mục"
    },
    plural: {
      en: "Categories",
      vi: "Danh mục"
    }
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true
  },
  fields: [
    ...baseField
    // { ...CustomSlugField }
  ]
};
