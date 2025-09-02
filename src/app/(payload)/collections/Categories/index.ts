import { CollectionConfig } from "payload";

import { baseField } from "../../fields/baseField";
import generateSlugForTitle from "../../hooks/genarateSlugForTitle";

export const Categories: CollectionConfig = {
  slug: "categories",
  folders: true,
  labels: {
    singular: {
      en: "Categories",
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
      vi: "Sản phẩm",
      en: "Products",
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
