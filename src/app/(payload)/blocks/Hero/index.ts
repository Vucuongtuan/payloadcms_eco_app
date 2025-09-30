import { Block } from "payload";
import { layout } from "../../fields/layout";
import { navItem } from "../../fields/navItem";
import { aspectField, spacingField } from "../../fields/spacingField";
import { uploadCustomField } from "../../fields/upload";



export const HeroBlock:Block = {
    slug:'heroBlock',
    fields:[
        layout,
        ...spacingField({localized:true}),
        ...aspectField({localized:true}),
        {
            type:"radio",
            name:"type",
            options:[
                {
                    label:"Single",
                    value:"single",
                },
                {
                    label:"Carousel",
                    value:"carousel",
                },
            ],
            defaultValue:'single',
            localized:true
        },
        {
            name:"single",
            type:"group",
            fields:[
                uploadCustomField({
                    name:'image',
                    label:'Image',
                    localized:true,
                    
                }),
                ...navItem({
                    isNav:false,
                }),
                {
                    type:'text',
                    name:'caption',
                    localized:true,
                }
            ],
            admin:{
                condition: (_, { type } = {}) => type === "media",
            }
        },
        {
            type:"array",
            name:"gallery",
            fields:[
                uploadCustomField({
                    name:'image',
                    label:'Image',
                    localized:true,
                }),
                ...navItem({
                    isNav:false,
                }),
                {
                    type:'text',
                    name:'caption',
                    localized:true,
                }
            ],
            admin:{
                condition: (_, { type } = {}) => type === "carousel",
            }
        }
    ]
}