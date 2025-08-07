import { CollectionConfig, Field } from "payload";

import { SlugField } from "./client/Field";

export const CustomSlugField: Field = {
  name: "slug",
  type: "text",
  required: true,
  admin: {
    components: {
      Field: "@/app/(payload)/customFields/slug/client/Field#SlugField"
    }
  }
};
