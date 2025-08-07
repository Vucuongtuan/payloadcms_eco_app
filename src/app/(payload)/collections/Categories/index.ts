import { unique } from "next/dist/build/utils";
import { CollectionConfig } from "payload";

import { CustomSlugField } from "@/app/(payload)/customFields";
import { SlugFields } from "@/components/fields/Slug";

export const Categories: CollectionConfig = {
  slug: "category",
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
    {
      name: "title",
      label: {
        en: "Title ",
        vi: "Tiêu đề "
      },
      type: "text",
      required: true,
      unique: true
    },
    CustomSlugField
    // { ...CustomSlugField }
  ]
};
