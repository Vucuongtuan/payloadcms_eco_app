import { Field, GlobalConfig, Tab } from "payload";
import { navItem } from "../fields/navItem";
import { revalidateGlobal } from "./hook/revalidateGlobal";

interface MenuFieldProps {
  label: string;
  name: string;
}
const createMenuTab = ({ label, name }: MenuFieldProps): Tab => {
  let navItemsFields: Field[];

  if (name === "header") {
    const linkFields = navItem({ isNav: true }).map((field) => ({
      ...field,
      admin: {
        ...(field.admin || {}),
        condition: (_, siblingData: any) => !siblingData.isShowMega,
      },
    }));

    navItemsFields = [

      ...linkFields as any,
    ];
  } else {
    // Keep original footer implementation
    navItemsFields = navItem({ isNav: true });
  }

  return {
    label,
    name,
    fields: [
      {
        type: "row",
        fields: [
          {
            name: "logo",
            type: "upload",
            label: "Logo",
            relationTo: "media",
          },
          {
            name: "logoDark",
            type: "upload",
            label: "Logo Dark",
            relationTo: "media",
          },
        ],
      },
      {
        name: "navItems",
        type: "array",
        label: "Navigation Items",
        fields: navItemsFields,
      },
    ],
  };
};
export const Settings: GlobalConfig = {
  label: "Settings",
  slug: "settings",
  admin: {
    group: "Settings",
  },
  hooks: {
    afterChange: [revalidateGlobal],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: {
            en: "Navigation",
            vi: "Navigation",
          },
          name: "nav",
          fields: [
            {
              type: "tabs",
              tabs: [
                createMenuTab({
                  label: "Header Menu",
                  name: "header",
                }),
                createMenuTab({
                  label: "Footer Menu",
                  name: "footer",
                }),
              ],
            },
          ],
        },
        {
          label: {
            en: "Announcement",
            vi: "Thông báo",
          },
          fields: [
            {
              name: "announcement",
              label: "Announcement",
              type: "group",
              fields: [
                {
                  name: "transition",
                  type: "select",
                  label: "Transition Effect",
                  options: [
                    { label: "Blur", value: "blur" },
                    { label: "Slide Horizontal", value: "slide-horizontal" },
                    { label: "Slide Vertical", value: "slide-vertical" },
                  ],
                  defaultValue: "blur",
                },
                {
                  name: "interval",
                  type: "number",
                  label: "Interval (ms)",
                  min: 1000,
                  defaultValue: 5000,
                },
                {
                  name: "announcement",
                  type: "array",
                  label: "Announcement",
                  fields: [
                    {
                      name: "content",
                      type: "text",
                      label: "Content",
                    },
                    {
                      name: "link",
                      type: "text",
                      label: "Link",
                    },
                  ],
                  localized: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
