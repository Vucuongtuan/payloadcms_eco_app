import { Field } from "payload";

export const groupCategoriesField = ({admin ={}}: {admin?: Field['admin']}): Field[] => {
  
    return [
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      filterOptions: () => {
        // const level = data?.level || "level1"
         return {
          parent:{
            equals: null,
          }
        }
      },
      ...(admin && admin)
    },
    {
      name: "subCategory",
      type: "relationship",
      relationTo: "categories",
      required: true,
      filterOptions: ({siblingData,data,blockData}) => {
        console.log({siblingData,data,blockData})
        // const level = data?.level || "level1"
         return {
          level: {
            equals: 'level3',
          },
        }
      },
      ...(admin && admin)
    },
  ];
};
