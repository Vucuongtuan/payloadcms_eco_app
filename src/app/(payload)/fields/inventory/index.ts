import { Field } from "payload";

export const inventoryField = (): Field => ({
  name: "inventory",
  type: "group",
  label: {
    vi: "Quản lý kho",
    en: "Inventory",
  },
  admin: {
    position: "sidebar",
  },
  fields: [
    {
      name: "sku",
      label: "SKU (Stock Keeping Unit)",
      type: "text",
      unique: true,
    },
    {
      name: "stock",
      label: {
        vi: "Số lượng tồn kho",
        en: "Stock Quantity",
      },
      type: "number",
      defaultValue: 0,
    },
  ],
});
