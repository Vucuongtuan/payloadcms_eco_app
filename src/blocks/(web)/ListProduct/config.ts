import { layout } from "@/fields/layout";
import { spacingField } from "@/fields/spacingField";
import { Block } from "payload";

export const ListProducts: Block = {
  slug: "ListProducts",
  interfaceName: "ListProductsBlock",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "General",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "description",
              type: "text",
              localized: true,
            },
            {
              name: "type",
              type: "select",
              options: [
                {
                  label: "Categories",
                  value: "categories",
                },
                {
                  label: "Products",
                  value: "products",
                },
                {
                  label: "Tags",
                  value: "tags",
                },
              ],
            },
            {
              name: "categories",
              type: "relationship",
              relationTo: "categories",
              hasMany: true,
              admin: {
                condition: (_, { type }) => type === "categories",
              },
            },
            {
              name: "products",
              type: "relationship",
              relationTo: "products",
              hasMany: true,
              admin: {
                condition: (_, { type }) => type === "products",
              },
            },
            {
              name: "hashTag",
              type: "relationship",
              relationTo: "tags",
              hasMany: true,
              admin: {
                condition: (_, { type }) => type === "tags",
              },
            },
          ],
        },
        {
          label: "Configs",
          name: "configs",
          fields: [
            layout,
            ...spacingField({ localized: false }),
            {
              name: "ui",
              type: "radio",
              options: [
                {
                  label: "Grid",
                  value: "grid",
                },
                {
                  label: "Carousel",
                  value: "carousel",
                },
              ],
            },
            {
              name: "gap",
              type: "number",
              defaultValue: 20,
            },
          ],
        },
      ],
    },
  ],
};
