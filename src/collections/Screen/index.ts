import { baseField } from "@/fields/baseField";
import { slugField } from "@/fields/slug";
import { CollectionConfig } from "payload";

export const Screen: CollectionConfig = {
  slug: "screen",
  admin: {
    group: "Mobile",
  },
  fields: [
    ...baseField,
    ...slugField("title"),
    {
      name: "sections",
      type: "blocks",
      blocks: [],
    },
  ],
};
