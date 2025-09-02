import { CollectionConfig } from "payload";
import { baseField } from "../../fields/baseField";
import { AnnouncementBar } from "../../blocks/AnnouncementBar";

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
  fields: [...baseField,
    {
      name:"blocks",
      type:"blocks",
      blocks:[AnnouncementBar]
    }
  ],
};
