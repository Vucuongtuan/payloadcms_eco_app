import { Page, Post } from "@/payload-types";
import { Field } from "payload";


const createDescription = (en: string, vi: string) => ({ en, vi });

const getNavItemFields = (): Field[] => [
  {
    type: "row",
    fields: [
      {
        type: "radio",
        name: "checkTypeLink",
        label: "Link Type",
        options: [
          { label: "Internal Link", value: "internal" },
          { label: "External Link", value: "external" }
        ],
        defaultValue: "internal",
        admin: {
          description: createDescription(
            "Choose whether this is an internal or external link",
            "Chọn liên kết nội bộ hoặc bên ngoài"
          )
        }
      },
      {
        name: "isblank",
        type: "checkbox",
        label: "Blank",
        admin: {
          description: createDescription(
            "Check if this item opens the document in a new window or tab",
            "Kiểm tra nếu mục này mở liên kết trong cửa sổ mới hoặc tab"
          )
        }
      },
    ]
  },
  {
    name: "title",
    type: "text",
    label: "Name menu",
    admin: {
      description: createDescription(
        "Enter the name for the menu item",
        "Nhập tên cho mục menu"
      ),
      condition: (_, siblingData) => siblingData?.checkTypeLink === "external"
    }
  },
  {
    name: "link",
    type: "text",
    label: "External Link",
    admin: {
      description: createDescription(
        "Enter the external URL to link to",
        "Nhập URL bên ngoài để liên kết"
      ),
      condition: (_, siblingData) => siblingData?.checkTypeLink === "external"
    }
  },
  {
    name: "localLink",
    type: "relationship",
    label: "Internal Link",
    relationTo: "pages" as any, // 

    admin: {
      description: createDescription(
        "Select an internal page or product to link to",
        "Chọn trang hoặc sản phẩm nội bộ để liên kết"
      ),
      condition: (_, siblingData) => siblingData?.checkTypeLink === "internal"
    }
  }
];

// Create the main function that includes children
export const navItem = ({ isNav = true }: { isNav?: boolean }): Field[] => {
  const baseFields = getNavItemFields();

  const children: Field = {
    name: "children",
    type: "array",
    label: "Sub Items",
    admin: {
      description: createDescription(
        "Add nested navigation items",
        "Thêm các mục điều hướng lồng nhau"
      )
    },
    fields: getNavItemFields()
  };
  return isNav ? [...baseFields, children] : baseFields;
};


interface LinkResult {
  title: string;
  link: string;
}
export const getLinkNavItem = (item: any): LinkResult | null => {
  if (!item) return { title: "None", link: "#" };

  let itemLink: LinkResult = { title: "No Name", link: "#" };
  if (item.item.checkTypeLink === "external") {
    itemLink = { title: item.item.title || "No Name", link: item.item.link || "#" }
  } else if (item.item.checkTypeLink === "internal" && item.item.localLink) {
    const relLink = item.item.localLink as Page | Post;
    itemLink = { title: relLink.title || "No Name", link: relLink?.slug ? `/${relLink.slug}` : "#" }
  }

  return itemLink;
}
// {"id": "68baab7206eaf8a76c5b6c76",
// "checkTypeLink": "internal",
// "isblank": null,
// "title": null,
// "link": null,

// "localLink": {
// "id": 2,
// "title": "Home page",
// "description": null,
// "slug": "home",
// "slugLock": true,

// "meta": {
// "title": "TCGear | High-end computer peripherals - Keyboard, Mouse,...",
// "description": "TCGear offers high-end computer accessories such as keyboards, mice, and headphones with modern design and superior performance.",
// "image": null
// },
// "folder": null,
// "updatedAt": "2025-09-05T04:04:36.123Z",
// "createdAt": "2025-09-05T04:03:58.067Z",

// "blocks": []
// },

// "children": []
// },