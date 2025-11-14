import { colorField } from "@/fields/color/colorField";
import { layout } from "@/fields/layout";
import { link } from "@/fields/link";
import { aspectField, spacingField } from "@/fields/spacingField";
import type { Block } from "payload";

export const MediaBlock: Block = {
  slug: "mediaBlock",
  interfaceName: "MediaBlock",
  fields: [
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      required: true,
      localized: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Template",
          fields: [
            {
              name: "template",
              type: "select",
              options: [
                { label: "Image Only", value: "image-only" },
                { label: "Image + Content (Center)", value: "image-center" },
                {
                  label: "Image + Content (Bottom Left)",
                  value: "image-bottom-left",
                },
                { label: "Column", value: "column" },
              ],
              defaultValue: "image-only",
            },
            {
              name: "columns",
              type: "radio",
              options: [
                { label: "Text First", value: "text-first" },
                { label: "Image First", value: "image-first" },
              ],
              admin: {
                condition: (_, { template } = {}) => template === "column",
              },
            },
            colorField({
              name: "background",
              admin: {
                condition: (_, { template } = {}) => template === "column",
              },
              defaultValue: "#f5f0eb",
            }),
            {
              name: "cta",
              type: "group",
              fields: [
                {
                  name: "content",
                  type: "richText",
                  localized: true,
                },
                link({
                  disableLabel: false,
                }),
              ],
              admin: {
                condition: (_, { template } = {}) => template !== "image-only",
              },
            },
          ],
        },
        {
          label: "Config",
          fields: [
            layout,
            ...spacingField({
              localized: true,
            }),
            ...aspectField({
              localized: true,
            }),
          ],
        },
      ],
    },
  ],
};
