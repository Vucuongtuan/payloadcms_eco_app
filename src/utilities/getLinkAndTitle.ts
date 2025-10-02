// utilities/nav.ts
import { Category, Page, Product } from "@/payload-types";

type Reference =
  | { relationTo: "pages"; value: number | Page }
  | { relationTo: "categories"; value: number | Category }
  | { relationTo: "products"; value: number | Product }

interface LinkItem {
  type?: "reference" | "custom" | null
  newTab?: boolean | null
  reference?: Reference | null
  url?: string | null
  label: string
}

// build href từ link
export function resolveLink(linkItem: { link: LinkItem }) {
  const { type, url, reference } = linkItem.link

  if (type === "custom") {
    return url ?? "#"
  }

  if (type === "reference" && reference) {
    const { relationTo, value } = reference
    if (!value) return "#"

    if (relationTo === "pages" && typeof value !== "number") {
      return `/${value.slug}`
    }
    if (relationTo === "categories" && typeof value !== "number") {
      return `/category/${value.slug}`
    }
    if (relationTo === "products" && typeof value !== "number") {
      return `/product/${value.slug}`
    }
  }

  return "#"
}

// lấy title từ link
export function resolveTitle(linkItem: { link: LinkItem }) {
  return linkItem.link.label || ""
}
