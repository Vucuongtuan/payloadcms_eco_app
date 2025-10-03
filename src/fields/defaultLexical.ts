import { Config } from "payload";

import {
  BoldFeature,
  defaultColors,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  IndentFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  TextStateFeature,
  UnderlineFeature,
  UnorderedListFeature
} from "@payloadcms/richtext-lexical";
export type HeadingTagType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type LexicalFeatureOptions = {
  headingSizes?: HeadingTagType[];
  enableHeading?: boolean;
  enableTextState?: boolean;
  enableLink?: boolean;
  enableTable?: boolean;
};

export const defaultLexical = ({
  headingSizes = ["h1", "h2", "h3", "h4", "h5"],
  enableHeading = true,
  enableTextState = true,
  enableLink = true,
  enableTable = true,
}: LexicalFeatureOptions = {}): Config["editor"] =>
  lexicalEditor({
    features: ({ defaultFeatures }) => {
      const features = [
        FixedToolbarFeature({
          disableIfParentHasFixedToolbar: true,
          applyToFocusedEditor: false,
        }),
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        OrderedListFeature(),
        UnorderedListFeature(),
         InlineToolbarFeature(),
        IndentFeature(),
        ...defaultFeatures,
      ];

      if (enableHeading) {
        features.push(
          HeadingFeature({
            enabledHeadingSizes: headingSizes,
          })
        );
      }

      if (enableTextState) {
        features.push(
          TextStateFeature({
            state: {
              color: {
                ...defaultColors.background,
                ...defaultColors.text,
                galaxy: {
                  label: "Galaxy",
                  css: {
                    background: "linear-gradient(to right, #0000ff, #ff0000)",
                    color: "white",
                  },
                },
                sunset: {
                  label: "Sunset",
                  css: {
                    background: "linear-gradient(to top, #ff5f6d, #6a3093)",
                  },
                },
              } as any,
            },
          })
        );
      }

      if (enableLink) {
        features.push(
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
          })
        );
      }

      if (enableTable) {
        features.push(EXPERIMENTAL_TableFeature());
      }

      return features;
    },
  });
