import { CollectionConfig } from "payload";
import { baseField } from "../../fields/baseField";

export const Brands: CollectionConfig = {
  slug: "brands",
  labels: {
    singular: {
      en: "Brands",
      vi: "Thương hiệu",
    },
    plural: {
      en: "Brands",
      vi: "Thương hiệu",
    },
  },
  fields: [
    ...baseField,
    {
      name: "location",
      type: "text",
    },
  ],
};
