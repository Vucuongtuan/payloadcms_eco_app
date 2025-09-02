import { CollectionConfig, Field } from "payload";
import { priceField } from "../../fields/price";
import { uploadCustomField } from "../../fields/upload";
import { statusField } from "../../fields/status";
import { inventoryField } from "../../fields/inventory";
import { specificationsField } from "../../fields/specifications";
import { contentBlocksField } from "../../fields/contentBlocks";
import { slugField } from "../../fields/slug";
import { galleryField } from "../../fields/gallery";

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
      name: "productType",
      type: "radio",
      label: { vi: "Loại sản phẩm", en: "Product Type" },
      options: [
        { value: "simple", label: { vi: "Sản phẩm đơn giản", en: "Simple Product" } },
        { value: "variable", label: { vi: "Sản phẩm có biến thể", en: "Variable Product" } },
      ],
      defaultValue: "simple",
      admin: {
        layout: "horizontal",
      },
    },
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
      name: 'sales',
      type: 'number',
      label: { vi: 'Lượt bán', en: 'Sales' },
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
    },
    {
      type: "tabs",
      tabs: [
        {
          label: { vi: "Nội dung chi tiết", en: "Content" },
          fields: [
            {
              name: "description",
              type: "textarea",
              label: { vi: "Mô tả ngắn", en: "Short Description" },
            },
            contentBlocksField(),
          ],
        },
        {
          label: { vi: "Dữ liệu sản phẩm", en: "Product Data" },
          fields: [
            specificationsField(),
            {
              ...galleryField(),
              admin: {
                ...galleryField().admin,
                condition: (_, { productType }) => productType === "simple",
              },
            },
          ],
        },
      ],
    },
    // --- Sidebar --- //
    statusField(),
    ...slugField(),
    uploadCustomField({
      name: "image",
      label: { vi: "Ảnh đại diện", en: "Featured Image" },
      required: true,
    }),
    {
      name: "taxonomies",
      type: "group",
      label: { vi: "Phân loại", en: "Taxonomies" },
      admin: { position: "sidebar" },
      fields: [
        {
          name: "brands",
          type: "relationship",
          relationTo: "brands",
          hasMany: true,
        },
        {
          name: "category",
          type: "relationship",
          relationTo: "categories",
          required: true,
        },
        {
          name: "subCategory",
          type: "relationship",
          relationTo: "subcategories",
          hasMany: true,
        },
        {
          name: "tags",
          type: "relationship",
          relationTo: "tags",
          hasMany: true,
        },
      ],
    },
    // Fields for Simple Products
    {
      ...priceField()[0],
      admin: {
        ...priceField()[0].admin,
        position: "sidebar",
        condition: (_, { productType }) => productType === "simple",
      },
    },
    {
      ...inventoryField(),
      admin: {
        ...inventoryField().admin,
        position: "sidebar",
        condition: (_, { productType }) => productType === "simple",
      },
    },
    // Field for Variable Products
    {
      name: "variants",
      type: "relationship",
      relationTo: "product-variants",
      hasMany: true,
      label: { vi: "Các biến thể", en: "Variants" },
      admin: {
        position: "sidebar",
        condition: (_, { productType }) => productType === "variable",
      },
    },
  ] as Field[],
};
