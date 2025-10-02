import { Field } from "payload";

export const baseField: Field[] = [
  {
    name: "title",
    label: {
      en: "Title ",
      vi: "Tiêu đề",
    },
    type: "text",
    required: true,
    // unique: true,
    localized: true,
  },
  {
    name: "description",
    label: {
      en: "Description",
      vi: "Mô tả",
    },
    type: "text",
    localized: true,
  },
];
