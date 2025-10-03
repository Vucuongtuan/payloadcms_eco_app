import { link } from "@/fields/link";
import { Block } from "payload";




export const Carousel:Block = {
    slug:"carousel",
    interfaceName:"Carousel",
    fields:[
        {
            name:"duration",
            type:"number",
            defaultValue:10000,
            required:true,
        },
        {
            type:"array",
            name:"gallery",
            fields:[
                {
                    name:"media",
                    type:"upload",
                    relationTo:"media",
                    required:true,
                    localized:true
                },
                {
                    name:"content",
                    type:"richText",
                    localized:true
                },
                link({disableLabel:true})
            ]
        }
       
    ]
}