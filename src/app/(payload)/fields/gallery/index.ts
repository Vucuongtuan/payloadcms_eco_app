import { ArrayField } from "payload";
import { navItem } from "../navItem";

type GalleryField = (isLink?: boolean) => ArrayField;

export const galleryField: GalleryField = (
  isLink: boolean = false,
): ArrayField => ({
  name: "gallery",
  type: "array",
  label: {
    vi: "Bộ sưu tập ảnh",
    en: "Image Gallery",
  },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: { vi: "Hình ảnh", en: "Image" },
    },
    {
      name: "content",
      type: "richText",
      label: { vi: "Nội dung", en: "Content" },
      required: false,
    },

    ...(isLink ? [...navItem({ isNav: false })] : []),
  ],
});
