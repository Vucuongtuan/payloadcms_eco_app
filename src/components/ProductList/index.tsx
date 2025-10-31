"use client";

import { Product } from "@/payload-types";
import { Lang, ResponseDocs } from "@/types";
import { ProductCard } from "./ProductCard";
import Skeleton from "./Skeleton";
import { useInfiniteProduct } from "./hooks/useInfiniteProduct";

interface ProductListProps {
  initData: ResponseDocs<Product>;
  categoryId: string;
  lang: Lang;
}

export default function ProductList(props: ProductListProps) {
  const { initData, categoryId, lang } = props;
  const { data, isFetchingNextPage, ref } = useInfiniteProduct({
    initData,
    categoryId,
    lang,
  });

  const products = data?.pages.flatMap((page) => page.docs) || [];

  return (
    <section className="w-full h-auto py-12">
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-1 gap-y-4 w-full">
        {products.map((doc) => (
          <li key={doc.id} className="aspect-card">
            <ProductCard doc={doc} lang={lang} />
          </li>
        ))}
        {isFetchingNextPage && (
          <Skeleton
            numberItems={4}
            className="rounded-lg"
            options={{
              isImage: {
                height: "h-[200px] lg:h-[300px]",
                width: "w-full",
              },
              isTitle: {
                height: "h-[20px]",
                width: "w-full",
              },
              isDescription: {
                height: "h-[16px]",
                width: "w-[60%]",
              },
              gap: "gap-2",
            }}
          />
        )}
      </ul>
      <div ref={ref} />
    </section>
  );
}
