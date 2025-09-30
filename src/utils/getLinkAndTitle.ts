type LinkType = "external" | "internal";

function resolveLink(
  type: LinkType | undefined,
  external?: string,
  internal?: { slug: string },
) {
  if (type === "external") return external ?? "#";
  if (type === "internal") return internal ? `/${internal.slug}` : "#";
  return "#";
}

export const getLink = (doc: any, cta?: boolean) => {
  const target = cta ? doc.cta : doc;
  return resolveLink(target?.checkTypeLink, target?.link, target?.localLink);
};

export const getTitle = (doc: any, cta?: boolean) => {
  const target = cta ? doc.cta : doc;
  if (target?.checkTypeLink === "external") {
    return target?.title || target?.url || "";
  }
  if (target?.checkTypeLink === "internal") {
    return target?.localLink?.value?.title || "";
  }
  return "";
};
