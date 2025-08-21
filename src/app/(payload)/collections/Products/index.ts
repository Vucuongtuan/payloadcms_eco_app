import { CollectionConfig, Field } from "payload";
import { galleryField } from "../../fields/gallery";
import { baseField } from "../../fields/baseField";
import { priceField } from "../../fields/price";
import { uploadCustomField } from "../../fields/upload";
import { Product as ProductType } from "@/payload-types";
export const Products: CollectionConfig = {
  slug: "products",
  folders: true,
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: {
            vi: "Thông tin",
            en: "Information",
          },
          fields: [
            ...baseField,
            //Category
            {
              name: "category",
              label: {
                vi: "Danh mục",
                en: "Category",
              },
              type: "relationship",
              relationTo: "categories",
              required: true,
              hasMany: false,
            },
            {
              name: "subCategory",
              label: {
                vi: "Danh mục con",
                en: "Sub Category",
              },
              type: "relationship",
              relationTo: "subcategories",
              hasMany: true,
              admin: {},
            },
          ],
        },
      ],
    },
    // view sidebar Admin
    {
      name: "brands",
      label: {
        vi: "Nhãn hiệu",
        en: "Brands",
      },
      type: "relationship",
      relationTo: "brands",
      hasMany: true,
      admin: {
        position: "sidebar",
        width: "full",
      },
    },
    ...priceField(),
    uploadCustomField({
      name: "image",
      label: {
        vi: "Hình ảnh",
        en: "Image",
      },
      required: true,
    }),
  ] as Field[],
};
