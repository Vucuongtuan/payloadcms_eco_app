import { Field } from "payload";

export const specificationsField = (): Field => ({
  name: "specifications",
  label: {
    vi: "Thông số kỹ thuật",
    en: "Specifications",
  },
  type: "blocks",
  labels: {
    singular: {
      vi: "Thông số",
      en: "Specification",
    },
    plural: {
      vi: "Các thông số",
      en: "Specifications",
    },
  },
  blocks: [
    {
      slug: "specItem",
      labels: {
        singular: {
          vi: "Thông số",
          en: "Specification",
        },
        plural: {
          vi: "Thông số",
          en: "Specification",
        },
      },
      fields: [
        {
          name: "key",
          type: "text",
          required: true,
          label: {
            vi: "Tên thông số",
            en: "Specification Name",
          },
          admin: {
            width: "50%",
          },
        },
        {
          name: "value",
          type: "text",
          required: true,
          label: {
            vi: "Giá trị",
            en: "Value",
          },
          admin: {
            width: "50%",
          },
        },
      ],
    },
  ],
});
