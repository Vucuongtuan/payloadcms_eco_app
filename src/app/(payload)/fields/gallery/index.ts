import { ArrayField, Field } from "payload";

type GalleryField = () => ArrayField


export const galleryField:GalleryField = () => ({
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
      name: "caption",
      type: "text",
      label: { vi: "Chú thích", en: "Caption" },
    },
  ],
});
