import { Field } from "payload";

export const groupCategoriesField = (): Field[] => {
  
    return [
    {
      name: "gender",
      type: "relationship",
      relationTo: "categories",
      filterOptions: {
        "folder.name": {
            equals: "Main category",
          },
      },
      required: true,
    },
    {
      name: "type",
      type: "relationship",
      relationTo: "categories",
      required: true,
      filterOptions: {
        "folder.name": {
            equals: "Sub category",
          },
      },
      admin: {
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      filterOptions: {
        "folder.name": {
            equals: "Product category",
          },
      },
     
    },
  ];
};
