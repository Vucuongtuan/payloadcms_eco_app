import { Field } from "payload";

export const statusField = (): Field => ({
  name: "_status",
  type: "select",
  label: {
    vi: "Trạng thái",
    en: "Status",
  },
  options: [
    {
      label: {
        vi: "Bản nháp",
        en: "Draft",
      },
      value: "draft",
    },
    {
      label: {
        vi: "Công khai",
        en: "Published",
      },
      value: "published",
    },
    {
      label: {
        vi: 'Hết hàng',
        en: 'Out of Stock',
      },
      value: 'out-of-stock',
    },
    {
      label:{
        vi:"Đặt trước",
        en:"Pre-order"
      },
      value:"pre-order"
    }
  ],
  defaultValue: "draft",
  admin: {
    position: "sidebar",
  },
});
