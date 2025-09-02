import { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  labels: {
    singular: {
      vi: "Đánh giá",
      en: "Review",
    },
    plural: {
      vi: "Đánh giá",
      en: "Reviews",
    },
  },
  admin: {
    group: {
      vi: "Sản phẩm",
      en: "Products",
    },
    defaultColumns: ["product", "user", "rating", "approved"],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      label: {
        vi: "Người đánh giá",
        en: "Reviewer",
      },
    },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
      label: {
        vi: "Sản phẩm",
        en: "Product",
      },
    },
    {
      name: "rating",
      type: "number",
      label: {
        vi: "Điểm đánh giá",
        en: "Rating",
      },
      min: 1,
      max: 5,
      required: true,
    },
    {
      name: "comment",
      type: "textarea",
      label: {
        vi: "Bình luận",
        en: "Comment",
      },
    },
    {
      name: "approved",
      type: "checkbox",
      label: {
        vi: "Đã duyệt",
        en: "Approved",
      },
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
    },
  ],
};
