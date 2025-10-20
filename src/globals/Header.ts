import type { GlobalConfig } from "payload";

import { link } from "@/fields/link";

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "logo",
      type: "relationship",
      relationTo: "media",
    },
    {
      name: "navItems",
      type: "array",
      fields: [
        link({
          appearances: false,
          localeLabel: true,
        }),
        {
          name: "child",
          type: "array",
          fields: [
            link({
              appearances: false,
              localeLabel: true,
            }),
            {
              name: "subChild",
              type: "array",
              fields: [
                link({
                  appearances: false,
                  localeLabel: true,
                }),
              ],
            },
          ],
        },
      ],
      maxRows: 6,
    },
  ],
};
