import { CollectionConfig } from "payload";
import { baseField } from "../../fields/baseField";

export const Pages: CollectionConfig = {
  slug: "pages",
  folders: true,
  labels: {
    singular: {
      vi: "Trang",
      en: "Page",
    },
    plural: {
      vi: "Trang",
      en: "Page",
    },
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [...baseField],
};
