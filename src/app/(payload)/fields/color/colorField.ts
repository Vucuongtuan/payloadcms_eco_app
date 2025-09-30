
import type { TextField } from "payload";

export const colorField = (overrides?: Omit<TextField, "type">): TextField => {
  const { name = "color", label = "Color", admin, ...rest } = overrides ?? {};

  return {
    type: "text",
    name,
    label,
    required: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validate: (val: any) => {
      const HEX_COLOR_REGEX = /^#(?:[0-9a-fA-F]{3}){1,2}(?:[0-9a-fA-F]{2})?$/;
      if (typeof val !== "string" || !HEX_COLOR_REGEX.test(val)) {
        return "Please enter a valid hex color (must start with #, e.g. #fff or #aabbcc).";
      }

      return true;
    },
    admin: {
      components: {
        Field: "@/app/(payload)/fields/color/ColorPicker#ColorPicker",
      },
      ...admin,
    },
    ...rest,
  } as TextField;
};
