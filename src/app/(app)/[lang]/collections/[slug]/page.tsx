import ProductList from "@/components/ProductList";
import { findCategoryBySlug, findListProductByCategory } from "@/service/pages";
import { Lang } from "@/types";
import { notFound } from "next/navigation";

export default async function PageCollection({
  params,
}: {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}) {
  const { lang = "vi", slug } = await params;
  const [category, products] = await Promise.all([
    findCategoryBySlug({ slug }),
    findListProductByCategory({ lang: lang as Lang, slug }),
  ]);
  console.log({ category });
  if (!category || !category.id || !products) return notFound();
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
