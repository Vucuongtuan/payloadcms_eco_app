import { Block } from "payload";
import { groupCategoriesField } from "../../fields/groupCategories";
import { layout } from "../../fields/layout";
import { spacingField } from "../../fields/spacingField";
import { uploadCustomField } from "../../fields/upload";




export const CategoryShowcase:Block = {
    slug:"categoryShowcase",
    fields:[
        layout,
        ...spacingField({localized:false}),
        uploadCustomField({
            name:"image",
            label:"Image",
            hasMany:true,
            admin:{
                description:{
                    en:"If you select multiple Media then block will display images in sequence in the form of carousel",
                    vi:"Nếu bạn chọn nhiều Media thì block sẽ hiển thị hình lần lượt theo dạng carousel"
                },
            }
        }),
        ...groupCategoriesField()
    ]
}