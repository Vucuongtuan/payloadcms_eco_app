import { CollectionConfig, Field } from "payload";
import { groupCategoriesField } from "../../../fields/groupCategories";
import { slugField } from "../../../fields/slug";
import { statusField } from "../../../fields/status";
import { uploadCustomField } from "../../../fields/upload";
import { variants } from "../../../fields/variant";

export const Products: CollectionConfig = {
  slug: "products",
  folders: true,
  admin: {
    useAsTitle: "title",
    group: {
      vi: "Sản phẩm",
      en: "Products",
    },
  },
  fields: [
    {
      name: 'views',
      type: 'number',
      label: { vi: 'Lượt xem', en: 'Views' },
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: 'sidebar',
      }
    },
    {
      name: "title",
      type: "text",
      required: true,
      label: { vi: "Tên sản phẩm", en: "Product Name" },
      localized:true
    },
    {
      name: "description",
      type: "textarea",
      label: { vi: "Mô tả ngắn", en: "Short Description" },
      localized:true
      
    },
    {
      name: 'sales',
      type: 'number',
      label: { vi: 'Lượt mua', en: 'Sales' },
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },

    },
    {
      type: "tabs",
      tabs: [
        {
          label:{
            vi:"Thông tin chung",
            en:"General"
          },
          fields:[
            {

              type:"group",
              label:{vi:"Thông tin sản phẩm chính",en:"Main Product Info"},
              fields:[
                ...variants({isStatus:false,requiredPrice:true,isMain:true,isName:false}),
              ]
            },
            {
              type:"group",
              label:{vi:"Biến thể",en:"Variants"},
              fields:[
                {
                  name:"variants",
                  type:"relationship",
                  relationTo:"variants",
                  hasMany:true,
                }
              ]
            }
          ],
         
        },
        {
          label: { vi: "Mô tả chi tiết", en: "Detail" },
          fields: [
            {
              name:"content",
              type:"richText",
              localized:true,
            },
            {
              name:"longContent",
              type:"richText",
              localized:true,
              admin:{
                description:{
                  vi:"Nội dung dài của sản phẩm là 1 trường optional nếu bạn muốn hiển thị nhiều nội dung hơn thay vì bị giới hạn bởi nội dung ngắn ",
                  en:"Long content of the product is an optional field if you want to display more content than the short content",
                }
              }
            }
          ],
        },
      ],
    },
    // --- Sidebar --- //
    statusField(),
    ...slugField("title",{},false),
    uploadCustomField({
      name: "image",
      label: { vi: "Ảnh đại diện", en: "Featured Image" },
      required: true,
      hasMany:true
    }),
    {
      name: "taxonomies",
      type: "group",
      label: { vi: "Phân loại", en: "Taxonomies" },
      admin: { position: "sidebar" },
      fields: [
        ...groupCategoriesField(),
        {
          name: "tags",
          type: "relationship",
          relationTo: "tags",
          hasMany: true,
        },
      ],
    },
   

  ] as Field[],
  versions:{
    drafts:true
}
};
