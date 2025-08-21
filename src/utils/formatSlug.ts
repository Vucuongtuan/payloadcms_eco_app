import { FieldHook } from "payload";

export const formatSlug = (val: string): string => {
  if (!val) return "";
  return val
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[đĐ]/g, "d")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === "string") {
      return formatSlug(value);
    }

    if (operation === "create" || data?.slug === undefined) {
      const fallbackData = data?.[fallback];

      if (typeof fallbackData === "string") {
        return formatSlug(fallbackData);
      }
    }

    return value;
  };
