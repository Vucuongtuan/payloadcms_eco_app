import { Block } from "payload";

export const CategoryProduct: Block = {
  slug: "categoryProduct",
  interfaceName: "Category Product",
  fields: [
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
    },
    {
      name: "soft",
      type: "select",
      options: [
        { label: "Date Public", value: "datePublic" },
        {
          label: "Hot Deal",
          value: "hotDeal",
        },
        {
          label: "New Arrival",
          value: "newArrival",
        },
        {
          label: "Featured",
          value: "featured",
        },
        {
          label: "Best Seller",
          value: "bestSeller",
        },
        {
          label: "On Sale",
          value: "onSale",
        },
        {
          label: "Brand",
          value: "brand",
        },
        {
          label: "# Hashtags",
          value: "hashtags",
        },
      ],
    },
    {
      name: "layout",
      type: "select",
      options: [
        { label: "Grid", value: "grid" },
        { label: "Carousel", value: "carousel" },
      ],
    },
    {
      name: "limit",
      type: "number",
      min: 1,
      max: 100,
      defaultValue: 12,
    },
    {
      name: "brand",
      type: "relationship",
      relationTo: "brands",
      hasMany: true,
      admin: {
        condition: (_, { soft }) => soft?.value === "brand",
      },
    },
    {
      name: "hashtags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
      admin: {
        condition: (_, { soft }) => soft?.value === "hashtags",
      },
    },
  ],
};
