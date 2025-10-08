import { priceField } from "@/fields/price";
import { slugField } from "@/fields/slug";
import { uploadCustomField } from "@/fields/upload";
import { variants } from "@/fields/variant";
import { CollectionConfig } from "payload";

// export const VariantsCollection: CollectionOverride = ({ defaultCollection }) => ({
//     ...defaultCollection,
//     ...defaultCollection?.admin,
//     defaultColumns: ['title', '_status', 'price'],
//     admin:{ useAsTitle: 'title',},
//     fields:[
//                 {
//             name:"title",
//             type:"text",
//             required:true
//         },
//         ...slugField("title",{},false),
//        ...variants({isStatus:false,requiredPrice:true,isMain:false,isName:false})
//     ]
// })

export const Variants: CollectionConfig = {
  slug: "variantsProduct",
  admin: {
    hidden: true,
    useAsTitle: "title",
  },
  fields: [
    {
      label: {
        vi: "Tiêu đề tiếng Anh",
        en: "Title English",
      },
      name: "title",
      type: "text",
      required: true,
    },
    {
      label: {
        vi: "Tiêu đề tiếng Việt",
        en: "Title Vietnamese",
      },
      name: "titleVN",
      type: "text",
      required: true,
    },

    ...priceField({ required: true }),
    ...slugField("title", {}, false),
    ...variants({
      isStatus: false,
      requiredPrice: true,
      isMain: false,
      isName: false,
    }),

    uploadCustomField({
      name: "gallery",
      label: "Gallery",
      hasMany: true,
      isGallery: true,
    }),
    uploadCustomField({
      name: "thumbnail",
      label: "Thumbnail",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
      minRows: 1,
      maxRows: 2,
    }),
  ],
  versions: {
    drafts: true,
  },
};
