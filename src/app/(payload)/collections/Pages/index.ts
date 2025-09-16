import { CollectionConfig } from "payload";
import { Hero, ModalBlock, NewProduct } from "../../blocks";
import { CategoryProduct } from "../../blocks/CategoryProduct";
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
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    ...baseField,
    {
      name: "blocks",
      type: "blocks",
      blocks: [Hero, ModalBlock, NewProduct, CategoryProduct],
    },
  ],
};
