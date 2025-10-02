import { Field } from "payload";

export const groupCategoriesField = ({admin ={}}: {admin?: Field['admin']}): Field[] => {
  
    return [
    {
      name: "gender",
      type: "relationship",
      relationTo: "categories",
      filterOptions: () => {
        // const level = data?.level || "level1"
         return {
          level: {
            equals: 'level1',
          },
        }
      },
      required: true,
      ...(admin && admin)
    },
    {
      name: "type",
      type: "relationship",
      relationTo: "categories",
      required: true,
      filterOptions: () => {
        // const level = data?.level || "level1"
         return {
          level: {
            equals: 'level2',
          },
        }
      },
      ...(admin && admin)
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      filterOptions: () => {
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
