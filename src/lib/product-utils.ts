import { Product, VariantsProduct } from "@/payload-types";
import { Lang } from "@/types";

export interface ProductVariant {
  slug: string;
  color?: string;
  title: string;
  pricing?: any;
  sizes?: any;
  thumbnail?: any;
  isMain?: boolean;
}

export function buildVariantSelectData({
  doc,
  variants,
  lang,
}: {
  doc: Product;
  variants: VariantsProduct[];
  lang: Lang;
}): ProductVariant[] {
  return [
    {
      slug: doc.slug!,
      color: doc.color,
      title: doc.title,
      pricing: doc.pricing,
      sizes: doc.sizes,
      thumbnail: doc.thumbnail,
      isMain: true,
    },
    ...variants.map((v) => ({
      slug: v.slug!,
      color: v.color,
      title: lang === "vi" ? ((v as any).titleVN ?? v.title) : v.title,
      pricing: v.pricing,
      sizes: v.sizes,
      thumbnail: v.thumbnail,
      isMain: false,
    })),
  ];
}
