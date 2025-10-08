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
      return value.isTopLevel ?  `/${value.slug}` : `/pages/${value.slug}`
    }
    if (relationTo === "categories" && typeof value !== "number") {
      return `/collection/${value.slug}`
    }
    if (relationTo === "products" && typeof value !== "number") {
      return `/${value.slug}`
    }
  }

  return "#"
}

// lấy title từ link
export function resolveTitle(linkItem: { link: LinkItem }) {
  return linkItem.link.label || ""
}
export const getLinkProps = (itemLink:any) => {
  const {type,reference,url,newTab} = itemLink
  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug}`
      : url

  if (!href) return null
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}
  return { href, newTabProps }
}
