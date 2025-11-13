import { Config } from "payload";

import {
  BoldFeature,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  IndentFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  TextStateFeature,
  UnderlineFeature,
  UnorderedListFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { extendDefaultColor } from "./textStateExtend";

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
              color: extendDefaultColor as any,
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
