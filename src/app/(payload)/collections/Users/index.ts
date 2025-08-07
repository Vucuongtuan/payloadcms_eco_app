import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: {
      en: "User",
      vi: "Người dùng"
    },
    plural: {
      en: "Users",
      vi: "Người dùng"
    }
  },
  admin: {
    useAsTitle: "email"
  },
  auth: true,
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: "name",
      label: {
        en: "Name",
        vi: "Tên"
      },
      type: "text",
      required: true
    },
    {
      name: "role",
      label: {
        en: "Role",
        vi: "Vai trò"
      },
      type: "select",
      hasMany: true,
      options: [
        {
          label: {
            en: "Admin",
            vi: "Quản trị viên"
          },
          value: "admin"
        },
        {
          label: {
            en: "Editor",
            vi: "Biên tập viên"
          },
          value: "editor"
        },
        {
          label: {
            en: "User",
            vi: "Người dùng"
          },
          value: "user"
        }
      ]
    }
  ]
};
