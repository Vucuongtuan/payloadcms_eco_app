import { CollectionConfig } from "payload";

export const Notifications: CollectionConfig = {
  slug: "notifications",
  admin: {},
  fields: [
    { name: "title", type: "text", localized: true, required: true },
    { name: "message", type: "textarea", localized: true, required: true },
    // { name: "image", type: "upload", relationTo: "media" },
    {
      type: "checkbox",
      name: "targetAll",
      defaultValue: true,
      label: {
        en: "Target All",
        vi: "Gửi đến tất cả người dùng",
      },
    },

    {
      type: "relationship",
      name: "targetUser",
      relationTo: "users",
      label: {
        en: "Target User",
        vi: "Gửi đến người dùng",
      },
      admin: {
        condition: (_, { targetAll } = {}) => !targetAll,
      },
    },
    {
      type: "radio",
      name: "platform",
      options: [
        {
          label: "All",
          value: "all",
        },
        {
          label: "Mobile",
          value: "mobile",
        },
        {
          label: "Web",
          value: "web",
        },
      ],
    },
    {
      name: "sendMail",
      type: "checkbox",
      defaultValue: false,
      label: {
        en: "Send Mail",
        vi: "Gửi email",
      },
    },
  ],
};
