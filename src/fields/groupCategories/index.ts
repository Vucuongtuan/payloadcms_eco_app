import { Field } from "payload";

export const groupCategoriesField = ({admin ={}}: {admin?: Field['admin']}): Field[] => {
  
    return [
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      filterOptions: () => {
        return {
          or: [
            { parent: { equals: null } },
            { parent: { exists: false } },
          ],
        }
      },
      ...(admin && admin)
    },
    {
      name: "subCategory",
      type: "relationship",
      relationTo: "categories",
      required: true,
      filterOptions: ({ siblingData }:any) => {
        return {
          parent: { equals: siblingData.category },
        }
      },
      admin: {
        condition: (_,siblingData:any) => {
          return !!siblingData?.category
        },
      },
     
    },
  ];
};
