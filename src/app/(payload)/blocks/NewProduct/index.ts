import { Block } from "payload";

export const NewProduct: Block = {
  slug: "newProduct",
  interfaceName: "New Product",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "categories",
      required: true,
      hasMany: true,
    },
    {
      name: "layout",
      type: "select",
      options: [
        { label: "Grid", value: "grid" },
        { label: "Carousel", value: "carousel" },
      ],
      defaultValue: "grid",
    },
    {
      name: "limit",
      type: "number",
      required: true,
      defaultValue: 12,
    },
  ],
};
