import { CollectionBeforeChangeHook } from "payload";

import { formatSlug } from "@/utils/formatSlug";

export default function generateSlugForTitle({
  data,
  operation,
  originalDoc,
}: CollectionBeforeChangeHook) {
  console.log({ data, originalDoc });
  if (operation !== "create" || !data) return data;

  const title = data.title;
  if (title) {
    data.slug = formatSlug(title);
  }

  return data;
}
