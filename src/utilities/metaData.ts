import { Category, Media, Page, Post, Product } from "@/payload-types";
import { defaultMeta } from "@/plugin";
import { Metadata } from "next";

type CollectionData = Post | Product | Category | Page;

const mergeDefaults = (data: CollectionData): any => ({
  title:
    data.title || `${defaultMeta.brandName} - Thời trang hiện đại cho giới trẻ`,
  description: (data as any).description || defaultMeta.description["vi"],
  meta: (data as any).meta || {
    title:
      data.title ||
      `${defaultMeta.brandName} - Thời trang hiện đại cho giới trẻ`,
    description: defaultMeta.description["vi"],
    image: null,
  },
  image: (data as any).image || null,
  thumbnail: (data as any).thumbnail || [],
  publishedAt: (data as any).publishedAt || null,
  publishedOn: (data as any).publishedOn || null,
  createdAt: data.createdAt || new Date().toISOString(),
});

export const generateMeta = ({ data }: { data: CollectionData }): Metadata => {
  const merged = mergeDefaults(data);

  const title = merged.meta.title || merged.title;
  const description =
    merged.meta.description ||
    merged.description ||
    defaultMeta.description["vi"];
  const ogImage =
    (merged.meta.image as Media)?.url ||
    merged.thumbnail[0]?.url ||
    (merged.image as Media)?.url ||
    "/img/default.webp";

  return {
    title,
    description,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"
    ),
    openGraph: {
      images: [ogImage],
      publishedTime: new Date(
        merged.publishedAt || merged.publishedOn || merged.createdAt
      ).toISOString(),
    },
  };
};
