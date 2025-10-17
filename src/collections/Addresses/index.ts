import { CollectionConfig } from "payload";

export const Address: CollectionConfig = {
  slug: "addresses",
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "customer",
      type: "relationship",
      relationTo: "users",
    },
    {
      name: "address",
      type: "text",
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "mail",
      type: "text",
    },
  ],
};
