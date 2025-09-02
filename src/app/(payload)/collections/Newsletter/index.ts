import { CollectionConfig } from "payload";

export const Newsletter:CollectionConfig={
    slug:"newsletter",
    labels:{
        singular:{
            vi:"Newsletter",
            en:"Newsletter"
        },
        plural:{
            vi:"Newsletter",
            en:"Newsletter"
        }
    },
    access:{
        read:()=>true,
        create:()=>true,
        update:()=>true,
        delete:()=>true,
    },
    fields:[
        {
            name:"listEmail",
            type:"relationship",
            relationTo:"email-subscribe",
            label:{
                vi:"Email",
                en:"Email"
            },
            hashMany:true,
        }
    ]
}