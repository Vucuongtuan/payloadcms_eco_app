import { CollectionConfig } from "payload";
import { galleryField } from "../../fields/gallery";
import { statusField } from "../../fields/status";

export const ProductVariants: CollectionConfig = {
  slug: "product-variants",
  labels: {
    singular: { vi: "Biến thể sản phẩm", en: "Product Variant" },
    plural: { vi: "Các biến thể sản phẩm", en: "Product Variants" },
  },
  admin: {
    useAsTitle: "name",
    group: {
      vi: "Sản phẩm",
      en: "Products",
    },
    defaultColumns: ["name", "price", "stock", "sku"],
    hidden: true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: { vi: "Tên biến thể", en: "Variant Name" },
      admin: {
        description: "Ví dụ: 'Màu Đỏ / Layout 100%' hoặc 'Bản 256GB màu Titan'",
      },
    },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      label: { vi: "Sản phẩm cha", en: "Parent Product" },
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    statusField(),
    {
      name: "price",
      type: "number",
      required: true,
      label: { vi: "Giá của biến thể", en: "Variant Price" },
    },
    {
      name: "options",
      type: "array",
      label: { vi: "Tùy chọn của biến thể", en: "Variant Options" },
      fields: [
        {
          name: "option",
          type: "text",
          required: true,
          label: { vi: "Loại tùy chọn", en: "Option Type" },
          admin: {
            description: "Ví dụ: 'Màu sắc', 'Dung lượng', 'Layout'",
            width: "50%",
          },
        },
        {
          name: "value",
          type: "text",
          required: true,
          label: { vi: "Giá trị tùy chọn", en: "Option Value" },
          admin: {
            description: "Ví dụ: 'Đỏ', '256GB', '100%'",
            width: "50%",
          },
        },
      ],
    },
    {
      type: "group",
      name: "inventory",
      label: { vi: "Quản lý kho", en: "Inventory" },
      fields: [
        {
          name: "sku",
          label: "SKU (Stock Keeping Unit)",
          type: "text",
          unique: true,
        },
        {
          name: "stock",
          label: { vi: "Số lượng tồn kho", en: "Stock Quantity" },
          type: "number",
          defaultValue: 0,
        },
      ],
    },
    galleryField(),
  ],
};
