import { Block } from "payload";
import { layout } from "../../fields/layout";
import { spacingField } from "../../fields/spacingField";


export const RichTextBlock: Block = {
    slug: "richTextBlock",
    fields: [
        layout,
        ...spacingField({localized:true}),
        {
            name: "content",
            type: "richText",
            localized: true
        }
    ]
} 