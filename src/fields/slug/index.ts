import { formatSlugHook } from "@/utilities/formatSlug";
import type { CheckboxField, TextField } from "payload";

type Overrides = {
  slugOverrides?: Partial<TextField>;
  checkboxOverrides?: Partial<CheckboxField>;
};

type Slug = (
  fieldToUse?: string,
  typeToUse?: string,
  overrides?: Overrides,
  localized?: boolean,
) => [TextField, CheckboxField];

export const slugField: Slug = (
  fieldToUse = "title",
  typeToUse,
  overrides = {},
  localized = true,
) => {
  const { slugOverrides, checkboxOverrides } = overrides;

  const checkBoxField: CheckboxField = {
    name: "slugLock",
    type: "checkbox",
    defaultValue: true,
    admin: {
      hidden: true,
      position: "sidebar",
    },
    ...checkboxOverrides,
  };

  // @ts-expect-error - ts mismatch Partial<TextField> with TextField
  const slugField: TextField = {
    name: "slug",
    type: "text",
    index: true,
    label: "Slug",
    ...(slugOverrides || {}),
    hooks: {
      beforeValidate: [formatSlugHook(fieldToUse)],
    },
    admin: {
      position: "sidebar",
      ...(slugOverrides?.admin || {}),
      components: {
        Field: {
          path: "@/fields/slug/slugComponent#SlugComponent",
          clientProps: {
            fieldToUse,
            typeToUse,
            checkboxFieldPath: checkBoxField.name,
          },
        },
      },
    },
    localized: localized ? true : false,
  };

  return [slugField, checkBoxField];
};
