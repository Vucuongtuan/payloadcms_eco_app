import { Config } from "payload";

import {
  EXPERIMENTAL_TableFeature,
  lexicalEditor,
  LinkFeature
} from "@payloadcms/richtext-lexical";

export const defaultLexical: Config["editor"] = lexicalEditor({
  features: ({ defaultFeatures }) => {
    return [
      ...defaultFeatures,

      LinkFeature({
        enabledCollections: ["products"],
        fields: ({ defaultFields }) => {
          const defaultFieldsWithoutUrl = defaultFields.filter(field => {
            if ("name" in field && field.name === "url") return false;
            return true;
          });

          return [
            ...defaultFieldsWithoutUrl,

            {
              name: "url",
              type: "text",
              admin: {
                condition: ({ linkType }) => linkType !== "internal"
              },
              label: ({ t }) => t("fields:enterURL"),
              required: true
            }
          ];
        }
      }),
      EXPERIMENTAL_TableFeature()
    ];
  }
});
