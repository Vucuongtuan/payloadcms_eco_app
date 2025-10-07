import { Field } from "payload";




export const autoGenSKU = ({fieldToUse,size}: {fieldToUse?: string,size?:string}):Field  =>{
    return {
        name:"sku",
        type:"text",
        admin:{
            description:"Auto generate SKU",
            components:{
                Field:{
                    path:"@/fields/autoGenSKU/autoGenComponents#AutoGenComponent",
                    clientProps:{
                        fieldToUse,
                        size,
                    }
                }
            }
        },
        unique:true
}
}