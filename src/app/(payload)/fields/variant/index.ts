import { Field } from "payload"
import { colorField } from "../color/colorField"
import { inventoryField } from "../inventory"
import { priceField } from "../price"
import { statusField } from "../status"


const sizes = [
    {label:"S",value:"s"},
    {label:"M",value:"m"},
    {label:"L",value:"l"},
    {label:"XL",value:"xl"},
    {label:"XXL",value:"xxl"},
]



export const variants = ({
    isStatus = true,
    requiredPrice = false,
    isMain = false,
    isName = true
}:{isStatus:boolean,requiredPrice:boolean,isMain?:boolean,isName?:boolean}):Field[] =>{

    return [
      ...(isName ? [
        {
           name:"name",
           type:"text"
        } as Field,
      ] : []),
        colorField({
            name:"color",
            label:"Color"    
        }),
        ...(isStatus ? [statusField()] : []),
        ...(isMain ? priceField({ required: requiredPrice}) : []),
        {
          name:"sizes",
          type:"group",
          fields:[
            {
              type:"tabs",
              tabs:[
                {
                  label:"S",
                  name:"s",
                  fields:[
                    {
                      name:"useGlobalPrice",
                      type:"checkbox",
                      defaultValue:false
                    },
                    ...priceField({ required: requiredPrice,condition: (_, doc) => doc?.useGlobalPrice === false}),
                    inventoryField(),
                  ]
                },
                {
                  label:"M",
                  name:"M",
                  fields:[
                    {
                      name:"useGlobalPrice",
                      type:"checkbox",
                      defaultValue:false
                    },
                    ...priceField({ required: requiredPrice,condition: (_, doc) => doc?.useGlobalPrice === false}),
                    inventoryField(),
                  ]
                },
                {
                  label:"L",
                  name:"L",
                  fields:[
                    {
                      name:"useGlobalPrice",
                      type:"checkbox",
                      defaultValue:false
                    },
                    ...priceField({ required: requiredPrice,condition: (_, doc) => doc?.useGlobalPrice === false}),
                    inventoryField(),
                  ]
                },
                {
                  label:"XL",
                  name:"xl",
                  fields:[
                    {
                      name:"useGlobalPrice",
                      type:"checkbox",
                      defaultValue:false
                    },
                    ...priceField({ required: requiredPrice,condition: (_, doc) => doc?.useGlobalPrice === false}),
                    inventoryField(),
                  ]
                },
                {
                  label:"2XL",
                  name:"xl",
                  fields:[
                    {
                      name:"useGlobalPrice",
                      type:"checkbox",
                      defaultValue:false
                    },
                    ...priceField({ required: requiredPrice,condition: (_, doc) => doc?.useGlobalPrice === false}),
                    inventoryField(),
                  ]
                },
              ]
            },
          ]
        }
        //  {
        //                   name:"sizes",
        //                   type:"array",
        //                   fields:[
        //                     {
        //                       name:"size",
        //                       type:"select",
        //                       options:sizes,
        //                       required:true,
        //                     },
                            
        //                     ...(!isMain ? priceField({ required: isMain && requiredPrice, }) : []),
        //                       inventoryField(),
        //                   ]
        //                 },
                    
    ]
}