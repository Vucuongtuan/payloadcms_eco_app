import { CollectionConfig, Field } from "payload";
import { slugField } from "../../fields/slug";
import { statusField } from "../../fields/status";
import { uploadCustomField } from "../../fields/upload";
import { variants } from "../../fields/variant";

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
                ...variants({isStatus:false,requiredPrice:true,isMain:true}),
              ]
            },
              {
                name: "variants",
                type: "array",
                label: { vi: "Các biến thể", en: "Variants" },
                fields:[
                  ...variants({isStatus:true,requiredPrice:false,isMain:false}),
                
                 
                ]              
              },
          ],
         
        },
        {
          label: { vi: "Mô tả chi tiết", en: "Detail" },
          fields: [
            {
              name:"content",
              type:"richText",
              localized:true

            }
          ],
        },
      ],
    },
    // --- Sidebar --- //
    statusField(),
    ...slugField("title",{},true),
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
        {
          name: "gender",
          type: "relationship",
          relationTo: "categories",
          filterOptions: {
            where: {
              parent: { exists: false } 
            }
          },
          required:true
        },
        {
          name: "category",
          type: "relationship",
          relationTo: "categories",
          required: true,
          filterOptions: {
            where: {
              parent: { exists: true }
            }
          }
        },
        {
          name: "subCategory", 
          type: "relationship",
          relationTo: "categories",
          required: true,
          filterOptions: { where: { parent: { exists: true } } },
        },
        {
          name: "tags",
          type: "relationship",
          relationTo: "tags",
          hasMany: true,
        },
      ],
    },
   

  ] as Field[],
};
