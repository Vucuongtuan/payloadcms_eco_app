import { Field } from "payload";


// Function to create a description object with both English and Vietnamese
const createDescription = (en: string, vi: string) => ({ en, vi });

// Define the base fields first
const getNavItemFields = (): Field[] => [
  {
    type:"row",
    fields:[
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
    name: "link",
    type: "text",
    label: "External Link",
    admin: {
      description: createDescription(
        "Enter the external URL to link to",
        "Nhập URL bên ngoài để liên kết"
      ),
   condition: (data, siblingData) => siblingData?.checkTypeLink === "external"
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
     condition: (data, siblingData) => siblingData?.checkTypeLink === "internal"
    }
  }
];

// Create the main function that includes children
export const navItem = ({isNav = true}:{isNav?:boolean}): Field[] => {
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