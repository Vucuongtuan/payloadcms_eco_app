import { baseField } from "@/fields/baseField";
import { slugField } from "@/fields/slug";
import { Category } from "@/payload-types";
import {
  deleteEmbeddingFromQdrant,
  saveEmbeddingToQdrant,
} from "@/utilities/embedding";
import { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  folders: {
    browseByFolder: true,
  },
  // tree: true,
  trash: true,
  labels: {
    singular: {
      en: "Category",
      vi: "Danh mục",
    },
    plural: {
      en: "Categories",
      vi: "Danh mục",
    },
  },
  admin: {
    useAsTitle: "title",
    group: {
      vi: "Danh Mục",
      en: "Categories",
    },
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  defaultSort: "slug",
  // defaultPopulate: ["title", "description", "slug"],
  // defaultPopulate: ["title", "description", "slug"],
  hooks: {
    beforeChange: [
      async ({ data, operation, originalDoc }) => {
        if (operation === "update" || operation === "create") {
          await saveEmbeddingToQdrant({
            data: data as Category,
            type: "category",
          });
        } else if (operation === "delete" && originalDoc) {
          await deleteEmbeddingFromQdrant(originalDoc.id);
        }
      },
    ],
  },
  fields: [...baseField, ...slugField("title", {}, false)],
};
