import { Field } from "payload";

export const shippingAddressField = (): Field => ({
  name: "shippingAddress",
  type: "group",
  label: {
    vi: "Địa chỉ giao hàng",
    en: "Shipping Address",
  },
  fields: [
    {
      name: "fullName",
      type: "text",
      label: {
        vi: "Họ và tên",
        en: "Full Name",
      },
      required: true,
    },
    {
      name: "phone",
      type: "text",
      label: {
        vi: "Số điện thoại",
        en: "Phone Number",
      },
      required: true,
    },
    {
      name: "address",
      type: "text",
      label: {
        vi: "Địa chỉ",
        en: "Address",
      },
      required: true,
    },
    {
      name: "city",
      type: "text",
      label: {
        vi: "Thành phố",
        en: "City",
      },
      required: true,
    },
    {
      name: "country",
      type: "text",
      label: {
        vi: "Quốc gia",
        en: "Country",
      },
      required: true,
    },
  ],
});
