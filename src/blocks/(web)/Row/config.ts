import { colorField } from "@/fields/color/colorField";
import { layout } from "@/fields/layout";
import { spacingField } from "@/fields/spacingField";
import { Block } from "payload";
import { Content } from "../Content/config";

export const RowBlock: Block = {
  slug: "rowBlock",
  interfaceName: "RowBlock",
  fields: [
    layout,
    ...spacingField({
      localized: false,
    }),
    colorField({
      name: "background",
      defaultValue: "#f5f0eb",
    }),
    {
      type: "blocks",
      name: "row",
      blocks: [Content],
      maxRows: 4,
    },
  ],
};
