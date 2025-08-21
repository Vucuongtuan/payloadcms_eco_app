import { formatSlugHook } from "@/utils/formatSlug";
import type { CheckboxField, Field, TextField } from "payload";

type Overrides = {
  slugOverrides?: Partial<TextField>;
  checkboxOverrides?: Partial<CheckboxField>;
};

type Slug = (
  fieldToUse?: string,
  overrides?: Overrides,
  localized?: boolean,
) => [TextField, CheckboxField];

export const slugField: Slug = (
  fieldToUse = "title",
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
          path: "@/app/(payload)/fields/slug/slugComponent#SlugComponent",
          clientProps: {
            fieldToUse,
            checkboxFieldPath: checkBoxField.name,
          },
        },
      },
    },
    localized: localized ? true : false,
  };

  return [slugField, checkBoxField];
};
