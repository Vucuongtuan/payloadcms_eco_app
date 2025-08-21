import { Field, GroupField } from "payload";

const customTotalFinalPrice =
  "@/app/(payload)/fields/price/totalFinalPrice#TotalFinalPrice";
// const customPriceLabelPath =
//   "@/app/(payload)/fields/price/priceComponent#PriceLabelComponent";
type PriceField = () => GroupField[];

export const priceField: PriceField = () => {
  const price: Field = {
    name: "price",
    label: {
      vi: "Giá",
      en: "Price",
    },
    type: "number",
    required: true,
    min: 0,
  };

  const discount: Field = {
    name: "discount",
    label: {
      vi: "Chiết khấu (%)",
      en: "Discount (%)",
    },
    type: "number",
    required: true,
    min: 0,
    defaultValue: 0,
  };

  const total: Field = {
    name: "total",
    label: {
      vi: "Tổng",
      en: "Total",
    },
    type: "text",
    required: true,
    admin: {
      readOnly: true,
      components: {
        Field: customTotalFinalPrice,
      },
    },
  };

  return [
    {
      name: "pricing",
      label: {
        vi: "Thông tin giá",
        en: "Pricing Information",
      },
      type: "group",
      fields: [price, discount, total],
      admin: {
        position: "sidebar",
        description: {
          vi: "Chỉ nhập giá bằng VND, các ngoại tệ khác sẽ được tự động quy đổi theo tỷ giá trong GlobalSetting.",
          en: "Enter the price in VND only, other currencies will be automatically converted based on the exchange rates defined in GlobalSetting.",
        },
      },
    },
  ];
};
