import { revalidatePath } from "next/cache";
import { CollectionConfig } from "payload";
import { baseField } from "../../fields/baseField";
import { PageBlock } from "../blocks";

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
  hooks:{
    beforeChange:[
      async ({data}) => {
        revalidatePath(`/vi`)
        revalidatePath(`/en`)
        console.log("revalidatePath: " ,data.slug)
      }
    ]
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
      blocks: PageBlock,
    },
  ],
};
