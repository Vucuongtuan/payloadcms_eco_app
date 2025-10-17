import type { CollectionConfig } from "payload";
import { generateBlurImage } from "./hooks/generateBlurImage";
import { MediaDoc } from "./types";

export const Media: CollectionConfig = {
  slug: "media",
  folders: true,
  labels: {
    singular: {
      en: "Media",
      vi: "Tài nguyên",
    },
    plural: {
      en: "Media",
      vi: "Tài nguyên",
    },
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [generateBlurImage],
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
    {
      name: "caption",
      type: "text",
    },
    {
      name: "blurData",
      type: "textarea",
      admin: {
        readOnly: true,
      },
    },
  ],
  upload: {
    skipSafeFetch: true,
    // @ts-expect-error
    adminThumbnail: ({ doc }: { doc: MediaDoc }) => {
      let thumbnailFileName = "";
      let thumbnailPrefix = doc.prefix;
      const resizeAbleMineTypes: string[] = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/webp",
        "image/heic",
        "image/tiff",
      ];
      if (typeof doc.mimeType !== "string") return undefined;

      if (resizeAbleMineTypes.includes(doc.mimeType) && doc.sizes?.thumbnail) {
        thumbnailFileName = doc.sizes.thumbnail.filename || doc.filename || "";
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [type, subtype] = doc.mimeType.split("/");
        thumbnailFileName = `${subtype.split("+")[0].replace(/\+/g, "_")}.png`;
        thumbnailPrefix = "static";
      }
      return [
        process.env.BASE_URL_BLOB,
        thumbnailPrefix,
        thumbnailFileName,
      ].join("/");
    },
    imageSizes: [
      {
        name: "thumbnail",
        formatOptions: {
          format: "webp",
        },
        height: undefined,
        width: 240,
      },
      {
        name: "small",
        formatOptions: {
          format: "webp",
        },
        height: undefined,
        width: 480,
      },
      {
        name: "medium",
        formatOptions: {
          format: "webp",
        },
        height: undefined,
        width: 1200,
      },
      {
        name: "large",
        formatOptions: {
          format: "webp",
        },
        height: undefined,
        width: 1600,
      },
    ],
    staticURL: process.env.BASE_URL_BLOB,
    staticDir: "/uploads",
    resizeOptions: {
      fit: "contain",
      withoutEnlargement: true,
    },
    mimeTypes: ["image/*", "audio/*", "video/*", "application/pdf"],
  },
};
