import { Field } from "payload";
import { autoGenSKU } from "../autoGenSKU";

export const inventoryField = ({size}: {size:string}): Field => ({
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
    autoGenSKU({fieldToUse:"title",size}),
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
