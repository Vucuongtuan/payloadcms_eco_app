import ProductDetails from "@/components/(product-details)/ProductDetails";
import { findProductBySlug, findSlugAllProduct } from "@/service/products";
import { Lang } from "@/types";
import { generateMeta } from "@/utilities/generateMeta";
import { cache } from "react";

/*
 * Generate static params for all products
 *    - vi, en
 * @returns {Promise<{ slug: string; lang: string }[]>}
 */
export async function generateStaticParams() {
  const products = await findSlugAllProduct();
  return products.flatMap((item) => [
    { slug: item.slug, lang: "vi" },
    { slug: item.slug, lang: "en" },
  ]);
}

// Memoizing data cache using React cache
const memoizingCache = cache(findProductBySlug);
// ---

interface Props {
  params: Promise<{ slug: string; lang: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug, lang } = await params;
  const product = await memoizingCache({ slug, lang: lang as Lang });
  console.log({ product });

  return (
    <>
      {" "}
      <ProductDetails doc={product} lang={lang as Lang} />
    </>
  );
}

export async function generateMetaData({ params }: Props) {
  const { slug, lang } = await params;
  const product = await memoizingCache({
    slug,
    lang: lang as Lang,
  });
  const meta = await generateMeta({ doc: product });
  return meta;
}
