import { Block } from "payload";
import { layout } from "../../fields/layout";
import { spacingField } from "../../fields/spacingField";
import { uploadCustomField } from "../../fields/upload";




export const SingleProductBlock:Block = {
    slug:"SingleProductBlock",
    fields:[
        layout,
        ...spacingField({localized:false}),
        {
            type:"radio",
            name:"type",
            options:[
                {label:"Auto",value:"auto"},
                {label:"Manual",value:"manual"}
            ]
        },
        {
            name:"product",
            type:"relationship",
            relationTo:"products",
            admin:{
                condition: (_, { type } = {}) => type === "manual",
            }
        },
        uploadCustomField({
            name:"image",
            label:"Image",
            hasMany:true,
            admin:{
                description:{
                    en:"If don't select media,block auto get image from product",
                    vi:"Nếu không chọn media, block sẽ tự động lấy ảnh từ sản phẩm"
                },
                condition: (_, { type } = {}) => type === "manual",
            }
        })
    ]
}