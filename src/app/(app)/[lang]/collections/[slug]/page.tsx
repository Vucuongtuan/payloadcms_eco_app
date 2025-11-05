import ProductList from "@/components/ProductList";
import { findCategoryBySlug, findListProductByCategory } from "@/service/pages";
import { Lang } from "@/types";
import { generateMeta } from "@/utilities/generateMeta";
import { genStaticParams } from "@/utilities/generateStaticParam";
import { notFound } from "next/navigation";
import { cache } from "react";

// Generate static params for all categories
//    - vi, en
// @returns {Promise<{ slug: string; lang: string }[]>}
export async function generateStaticParams() {
  return genStaticParams({ collection: "categories" });
}

// Memoizing data cache using React cache
const memoizingCache = cache(findCategoryBySlug);
// ---

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}
export default async function PageCollection({ params }: Props) {
  "use memo"; // react compiler mode
  const { lang = "vi", slug } = await params;
  const [category, products] = await Promise.all([
    memoizingCache({ slug, lang: lang as Lang }),
    findListProductByCategory({ lang: lang as Lang, slug }),
  ]);
  if (!category || !category.id) return notFound();
  return (
    <>
      {/* <MetaTitle
        title={category.title}
        description={category.description || ""}
      /> */}
      {/* <ListProduct data={products}/> */}
      <ProductList
        categoryId={category.id}
        initData={products}
        lang={lang as Lang}
      />
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug, lang } = await params;
  const category = await memoizingCache({
    slug,
    lang: lang as Lang,
  });
  const meta = await generateMeta({ doc: category, lang: lang as Lang });
  return meta;
}
