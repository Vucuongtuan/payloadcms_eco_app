import { Field } from "payload";

export const baseField: Field[] = [
  {
    name: "title",
    label: {
      en: "Title ",
      vi: "Tiêu đề "
    },
    type: "text",
    required: true,
    unique: true
  },
  {
    name: "slug",
    label: {
      en: "Slug",
      vi: "Slug"
    },
    type: "text",
    required: true,
    unique: true,
    admin: {
      position: "sidebar",
      description: {
        en: "Slug will be generated from title when save",
        vi: "Slug sẽ được tạo từ tiêu đề khi save"
      }
    }
  }
];
