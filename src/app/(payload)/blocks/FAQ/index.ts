import { Block } from "payload";
import { layout } from "../../fields/layout";
import { spacingField } from "../../fields/spacingField";




export const FAQ: Block = {
    slug: "faq",
    labels: {
        singular: {
            vi: "FAQ",
            en: "FAQ",
        },
        plural: {
            vi: "FAQ",
            en: "FAQ",
        },
    },
    fields: [
        layout,
        ...spacingField({localized:true}),
        {
            name: "direction",
            type: "select",
            options: [
                { label: "Horizontal", value: "horizontal" },
                { label: "Vertical", value: "vertical" },
            ],
            defaultValue: "horizontal",
            localized: true
        },
        {
            name: "content",
            type: "richText",
            localized: true
        },
        {
            name: "faqList",
            type: "array",
            fields: [
                {
                    name: "question",
                    type: "text",
                    localized: true
                },
                {
                    name: "answer",
                    type: "richText",
                    localized: true
                }
            ]
        }
    ]
}