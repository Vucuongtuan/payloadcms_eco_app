import { CollectionBeforeChangeHook } from "payload";

export const beforeChangeMetaImage: CollectionBeforeChangeHook = ({
  data,
  operation,
}) => {
  if (
    (operation === "create" || operation === "update") &&
    data?.gallery &&
    !data.meta.image
  ) {
    const firstImage = data?.gallery?.[0].image[0];
    return {
      ...data,
      meta: {
        ...data?.meta,
        image: firstImage,
      },
    };
  }
  return data;
};
