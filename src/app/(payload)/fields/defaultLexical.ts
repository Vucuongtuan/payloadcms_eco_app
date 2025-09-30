import { Config } from "payload";

import {
  defaultColors,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
  LinkFeature,
  TextStateFeature
} from "@payloadcms/richtext-lexical";
export type HeadingTagType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export const defaultLexical = ({
  headingSizes = ["h1", "h2", "h3", "h4", "h5"],
}: { headingSizes?: HeadingTagType[] } = {}): Config["editor"] =>
  lexicalEditor({
    features: ({ defaultFeatures }) => {
      return [
        FixedToolbarFeature({
          disableIfParentHasFixedToolbar: true,
          applyToFocusedEditor: false,
        }),
        ...defaultFeatures,
        HeadingFeature({
          enabledHeadingSizes: headingSizes,
        }),
        TextStateFeature({
          state: {
            color: {
              ...defaultColors.background,
              ...defaultColors.text,
              galaxy: { label: 'Galaxy', css: { background: 'linear-gradient(to right, #0000ff, #ff0000)', color: 'white' } },
              sunset: { label: 'Sunset', css: { background: 'linear-gradient(to top, #ff5f6d, #6a3093)' } },
            } as any,
          }
        }),
        LinkFeature({
          enabledCollections: ["products"],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              if ("name" in field && field.name === "url") return false;
              return true;
            });

            return [
              ...defaultFieldsWithoutUrl,

              {
                name: "url",
                type: "text",
                admin: {
                  condition: ({ linkType }) => linkType !== "internal",
                },
                label: ({ t }) => t("fields:enterURL"),
                required: true,
              },
            ];
          },
        }),
        EXPERIMENTAL_TableFeature(),
      ];
    },
  });
