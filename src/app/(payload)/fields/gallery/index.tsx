import { Field } from "payload";
export const galleryField: Field[] = [
  {
    name: "gallery",
    type: "relationship",
    hasMany: true,
    relationTo: "media",
  },
  {
    name: "galleryUI",
    type: "ui",
    admin: {
      components: {
        Field:
          "@/app/(payload)/fields/gallery/galleryRelationship#GalleryRelationship",
      },
    },
  },
];
