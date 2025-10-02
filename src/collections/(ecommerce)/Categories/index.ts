import { baseField } from "@/fields/baseField";
import { slugField } from "@/fields/slug";
import { CollectionConfig } from "payload";


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
  defaultSort: "slug",
  // defaultPopulate: ["title", "description", "slug"],
  // defaultPopulate: ["title", "description", "slug"],
  hooks: {
    // beforeChange: [generateSlugForTitle],
  },
  fields: [
    ...baseField,
     ...slugField("title",'type',{},false),

    {
      name:"level",
      type:"select",
      options:[
        {label:"Level 1",value:"level1"},
        {label:"Level 2",value:"level2"},
        {label:"Level 3",value:"level3"},
      ],
      defaultValue:"level3",
      required:true
    },
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
        // {
        //   name:"sections",
        //   type:"blocks",
        //   blocks:CategoryBlock
        // }
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
