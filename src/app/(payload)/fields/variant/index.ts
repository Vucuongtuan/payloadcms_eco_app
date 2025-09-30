import { Field } from "payload"
import { colorField } from "../color/colorField"
import { inventoryField } from "../inventory"
import { priceField } from "../price"
import { statusField } from "../status"


const sizes = [
    {label:"S",value:"S"},
    {label:"M",value:"M"},
    {label:"L",value:"L"},
    {label:"XL",value:"XL"},
    {label:"XXL",value:"XXL"},
]



export const variants = ({
    isStatus = true,
    requiredPrice = false,
    isMain = false
}:{isStatus:boolean,requiredPrice:boolean,isMain?:boolean}):Field[] =>{

    return [
        {
           name:"name",
           type:"text"
        },
        colorField({
            name:"color",
            label:"Color"    
        }),
        ...(isStatus ? [statusField()] : []),
        ...(isMain ? priceField({ required: requiredPrice}) : []),
         {
                          name:"sizes",
                          type:"array",
                          fields:[
                            {
                              name:"size",
                              type:"select",
                              options:sizes,
                              required:true,
                            },
                            
                            ...(!isMain ? priceField({ required: isMain && requiredPrice, }) : []),
                              inventoryField(),
                          ]
                        },
                    
    ]
}