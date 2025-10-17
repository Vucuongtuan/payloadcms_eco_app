import { Field, GroupField } from "payload";

const customTotalFinalPrice =
  "@/app/(payload)/fields/price/totalFinalPrice#TotalFinalPrice";
// const customPriceLabelPath =
//   "@/app/(payload)/fields/price/priceComponent#PriceLabelComponent";
type PriceField = ({
  required,
  condition,
}: {
  required: boolean;
  condition?: (data: any, siblingData: any) => boolean;
}) => GroupField[];

export const priceField: PriceField = ({ required = false, condition }) => {
  const price: Field = {
    name: "price",
    label: {
      vi: "Giá",
      en: "Price",
    },
    type: "text",
    required: required,
    admin: {
      components: {
        Field: "@/fields/price/priceFomatVND#PriceFormatVND",
      },
    },
  };

  const discount: Field = {
    name: "discount",
    label: {
      vi: "Chiết khấu (%)",
      en: "Discount (%)",
    },
    type: "number",
    required: required,
    min: 0,
    defaultValue: 0,
  };

  return [
    {
      name: "pricing",
      label: {
        vi: "Thông tin giá",
        en: "Pricing Information",
      },
      type: "group",
      fields: [price, discount],
      admin: {
        position: "sidebar",
        description: {
          vi: "Chỉ nhập giá bằng VND, các ngoại tệ khác sẽ được tự động quy đổi theo tỷ giá trong GlobalSetting.",
          en: "Enter the price in VND only, other currencies will be automatically converted based on the exchange rates defined in GlobalSetting.",
        },
        ...(condition ? { condition } : {}),
      },
    },
  ];
};
