import { slugField } from "@/app/(payload)/fields/slug";
import { variants } from "@/app/(payload)/fields/variant";
import { CollectionConfig } from "payload";




export const Variants: CollectionConfig = {
    slug:"variants",
    admin:{
        hidden:true,
        useAsTitle:'title'
    },
    fields:[
        {
            name:"title",
            type:"text",
            required:true
        },
        ...slugField("title",{},false),
       ...variants({isStatus:false,requiredPrice:true,isMain:false,isName:false})
    ],
    versions:{
        drafts:true
    }
}
  
