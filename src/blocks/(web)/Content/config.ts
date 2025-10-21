import type { Block, Field } from "payload";

import { defaultLexical } from "@/fields/defaultLexical";
import { layout } from "@/fields/layout";
import { spacingField } from "@/fields/spacingField";

const columnFields: Field[] = [
  {
    name: "size",
    type: "select",
    defaultValue: "oneThird",
    options: [
      {
        label: "One Third",
        value: "oneThird",
      },
      {
        label: "Half",
        value: "half",
      },
      {
        label: "Two Thirds",
        value: "twoThirds",
      },
      {
        label: "Full",
        value: "full",
      },
    ],
  },
  {
    name: "richText",
    type: "richText",
    editor: defaultLexical({
      headingSizes: ["h2", "h3", "h4"],
      enableHeading: true,
      enableTextState: true,
      enableLink: true,
      enableTable: true,
    }),
    label: false,
    localized: true,
  },
];

export const Content: Block = {
  slug: "content",
  interfaceName: "ContentBlock",
  fields: [
    layout,
    ...spacingField({
      localized: true,
    }),
    {
      name: "columns",
      type: "array",
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
      maxRows: 3,
    },
  ],
};
