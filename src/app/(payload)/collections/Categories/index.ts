import { CollectionConfig } from "payload";

import { baseField } from "../../fields/baseField";
import { CategoryBlock } from "../blocks";

export const Categories: CollectionConfig = {
  slug: "categories",
  folders: {
    browseByFolder:true
  },
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
  // defaultSort: "title",
  // defaultPopulate: ["title", "description", "slug"],
  // defaultPopulate: ["title", "description", "slug"],
  hooks: {
    // beforeChange: [generateSlugForTitle],
  },
  fields: [
    ...baseField,
    {
      type:"group",
      name:"blocks",
      fields:[
        {
          type:"radio",
          name:"direction",
          options:[
            {label:"Top",value:"top"},
            {label:"Bottom",value:"bottom"}
          ],
          defaultValue:"top"
        },
        {
          name:"sections",
          type:"blocks",
          blocks:CategoryBlock
        }
      ]
    }
    // {
    //   name: "breadcrumbs",
    //   type: "ui",
    //   admin: {
    //     components: {
    //       Field:
    //         "@/app/(payload)/customFields/breadcrumbs/breadcrumbsUI#BreadcrumbsUI"
    //     }
    //   }
    // }
    // { ...CustomSlugField }
  ],
};
