import { Block } from "payload";
import { layout } from "../../fields/layout";
import { navItem } from "../../fields/navItem";
import { aspectField, spacingField } from "../../fields/spacingField";
import { uploadCustomField } from "../../fields/upload";





export const MediaBlock:Block = {
    slug:"mediaBlock",
    fields:[
        layout,
        ...spacingField({localized:true}),
        ...aspectField({localized:true}),
        {
            type:"select",
            name:"column",
            options:[
                {
                    label:"One column",
                    value:"one-column",
                },
                {
                    label:"Two column",
                    value:"two-column",
                },
                {
                    label:"Three column",
                    value:"three-column",
                },
            ],
            localized:true
        },
        {

            name:"gallery",
            type:"array",
            fields:[
                {
                    name:"caption",
                    type:"text",
                    localized:true
                },
                uploadCustomField({
                    name:"image",
                    localized:true,
                }),
                ...navItem({isNav:false})
            ],
            localized:true
        },

       
    ]
}