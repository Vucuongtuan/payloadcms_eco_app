import {
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const StickyElementBlock: Block = {
  slug: "StickyElementBlock",
  interfaceName: "StickyElementBlockProps",
  imageURL: "/public/icon/element.svg",
  fields: [
    {
      name: "first",
      type: "radio",
      options: [
        {
          label: "Text | Media",
          value: "text",
        },
        {
          label: "Media | Text",
          value: "media",
        },
      ],
      defaultValue: "text",
    },
    {
      name: "stickyCol",
      type: "radio",
      options: [
        {
          label: "Text Sticky",
          value: "text",
        },
        {
          label: "Media Sticky",
          value: "media",
        },
      ],
      defaultValue: "media",
    },
    {
      name: "content",
      type: "richText",
      label: "Content",
      editor: lexicalEditor({
        features({ defaultFeatures }) {
          return [
            ...defaultFeatures,
            FixedToolbarFeature({
              disableIfParentHasFixedToolbar: false,
              applyToFocusedEditor: false,
            }),
            HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4", "h5"] }),
          ];
        },
      }),
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      hasMany: true,
    },
  ],
};
