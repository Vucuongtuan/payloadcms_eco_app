import { cacheFunc } from "@/lib/cacheFunc";
import { query } from "@/lib/tryCatch";
import { Product, Tag } from "@/payload-types";
import { Lang, ResponseDocs } from "@/types";

let LIMIT_STATIC_PRODUCT = process.env.LIMIT_STATIC_PRODUCT || 40;

interface FindProductBySlugProps {
  slug: string;
  lang: Lang;
  isMeta?: boolean;
}

export const findProductBySlug = async ({
  slug,
  lang,
  isMeta = false,
}: FindProductBySlugProps) =>
  cacheFunc(
    async () => {
      const [result, err] = await query<ResponseDocs<Product>>((payload) => {
        return payload.find({
          collection: "products",
          where: {
            slug: {
              equals: slug,
            },
            _status: {
              equals: "published",
            },
          },
          limit: 1,
          locale: lang,
          ...(isMeta && {
            selects: {
              id: true,
              title: true,
              description: true,
              meta: true,
              thumbnail: true,
              slug: true,
            },
          }),
        });
      });
      if (err) throw err;
      return result.docs[0];
    },
    ["product", slug],
    {
      tags: [`product:${slug}`],
    }
  )();

type ProductSlug = {
  id: number;
  slug: string;
};

export const findSlugAllProduct = async (): Promise<ProductSlug[]> =>
  cacheFunc(
    async () => {
      const [result, err] = await query<any>((payload) =>
        payload.find({
          collection: "products",
          where: {
            _status: {
              equals: "published",
            },
          },
          limit: LIMIT_STATIC_PRODUCT,
          select: {
            slug: true,
          },
        })
      );
      if (err) throw err;
      return result.docs;
    },
    ["generateStaticParam"],
    {
      tags: [`generateStaticParam:${"products"}`],
    }
  )();

export const findProductsByTagsOrCategorySlug = async ({
  slugCategory,
  tags,
  lang,
  limit,
  page,
}: {
  slugCategory: string;
  tags: Tag[];
  lang: Lang;
  limit?: number;
  page?: number;
}) =>
  cacheFunc(
    async () => {
      const [result, err] = await query<ResponseDocs<Product>>((payload) => {
        return payload.find({
          collection: "products",
          where: {
            _status: {
              equals: "published",
            },
            or: [
              {
                "taxonomies.category.slug": {
                  equals: slugCategory,
                },
              },
              {
                "taxonomies.tags": {
                  in: tags,
                },
              },
            ],
          },
          page: page,
          limit: limit,
          locale: lang,
        });
      });
      if (err) throw err;
      return result.docs;
    },
    ["relatest-product"],
    {
      tags: [`relatest-product`],
    }
  )();
