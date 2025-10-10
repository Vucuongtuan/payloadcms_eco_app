"use client";

import { Product } from "@/payload-types";
import { findProductsByCategory } from "@/service/actions";
import { Lang, PaginationOption, ResponseDocs } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { get } from "lodash";

interface Props {
  lang: Lang;
  initData: ResponseDocs<Product>;
  categoryId: number;
  options?: PaginationOption;
}
export const useInfiniteProduct = (props: Props) => {
  const { lang, initData, categoryId, options } = props;

  // infinite scroll
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.5,
    root: null,
    rootMargin: "0px 0px 300px 0px",
  });

  const { data, error, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products", lang, categoryId],
      queryFn: ({ pageParam = 1 }) =>
        findProductsByCategory({
          lang,
          page: pageParam as number,
          limit: options?.limit || 10,
          categoryId,
        }),
      initialData: {
        pages: [initData],
        pageParams: [1],
      },
      getNextPageParam: (lastPage) => get(lastPage, "nextPage"),
      initialPageParam: 1,
    });

  return {
    ref,
    entry,
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};
