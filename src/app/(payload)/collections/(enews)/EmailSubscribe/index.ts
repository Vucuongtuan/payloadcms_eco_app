import { CollectionConfig } from "payload";



export const EmailSubscribe:CollectionConfig={
    slug:"email-subscribe",
    labels:{
        singular:{
            vi:"Email Subscribe",
            en:"Email Subscribe"
        },
        plural:{
            vi:"Email Subscribe",
            en:"Email Subscribe"
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
            name:"email",
            type:"text",
            required:true,
            label:{
                vi:"Email",
                en:"Email"
            }
        }
    ]
}