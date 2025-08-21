import { CollectionConfig } from "payload";

import { baseField } from "../../fields/baseField";
import generateSlugForTitle from "../../hooks/genarateSlugForTitle";

export const Tags: CollectionConfig = {
  slug: "tags",
  labels: {
    singular: {
      en: "HashTag",
      vi: "Hashtag",
    },
    plural: {
      en: "HashTag",
      vi: "Hashtag",
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
