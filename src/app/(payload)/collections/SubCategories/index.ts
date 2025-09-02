import { CollectionConfig } from "payload";

import { baseField } from "../../fields/baseField";
import generateSlugForTitle from "../../hooks/genarateSlugForTitle";

export const SubCategories: CollectionConfig = {
  slug: "subcategories",
  folders: true,
  labels: {
    singular: {
      en: "Sub categories",
      vi: "Danh mục con",
    },
    plural: {
      en: "Sub Categories",
      vi: "Danh mục con",
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
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      label: { vi: "Thuộc danh mục", en: "Parent Category" },
    },
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
  admin: {
    useAsTitle: "title",
     group: {
      vi: "Sản phẩm",
      en: "Products",
    },
  },
};
