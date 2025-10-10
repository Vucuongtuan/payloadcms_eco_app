import type { Metadata } from "next";

import type { Category, Page, Post, Product } from "../payload-types";

import { defaultMeta } from "@/plugin";
import { mergeOpenGraph } from "./mergeOpenGraph";

export const generateMeta = async (args: {
  doc: Page | Product | Post | Category;
}): Promise<Metadata> => {
  const { doc } = args || {};

  const ogImage =
    typeof doc?.meta?.image === "object" &&
    doc.meta.image !== null &&
    "url" in doc.meta.image &&
    `${process.env.NEXT_PUBLIC_SERVER_URL}${doc.meta.image.url}`;

  return {
    description: doc?.meta?.description || defaultMeta.description["vi"],
    openGraph: mergeOpenGraph({
      ...(doc?.meta?.description
        ? {
            description: doc?.meta?.description,
          }
        : {}),
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title:
        doc?.meta?.title ||
        doc?.title ||
        `${defaultMeta.brandName} - Thời trang hiện đại cho giới trẻ`,
      url: Array.isArray(doc?.slug) ? doc?.slug.join("/") : "/",
    }),
    title:
      doc?.meta?.title ||
      doc?.title ||
      `${defaultMeta.brandName} - Thời trang hiện đại cho giới trẻ`,
  };
};
