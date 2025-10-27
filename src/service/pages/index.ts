import { cacheFunc } from "@/lib/cacheFunc";
import { query } from "@/lib/tryCatch";
import { Category, Page, Product } from "@/payload-types";
import { Lang, ResponseDocs } from "@/types";

export const findPageDoc = async (
  lang: Lang,
  slug: string
): Promise<Page | Error> => {
  return cacheFunc(
    async () => {
      const [result, err] = await query<ResponseDocs<Page>>((payload) => {
        return payload.find({
          collection: "pages",
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
        });
      });
      if (err) throw err;
      return result.docs[0] as Page;
    },
    [`page`, lang, slug],
    {
      tags: [`page-${lang}-${slug}`],
    }
  )();
};

export const findCategoryBySlug = ({ slug }: { slug: string }) => {
  return cacheFunc(
    async () => {
      const [result, err] = await query<ResponseDocs<Category>>((payload) => {
        return payload.find({
          collection: "categories",
          where: {
            slug: {
              equals: slug,
            },
          },
          limit: 1,
        });
      });
      if (err) throw err;
      return result.docs[0] as Category;
    },
    [`category`, slug],
    {
      tags: [`category:${slug}`],
    }
  )();
};

export const findListProductByCategory = ({
  lang,
  slug,
  limit,
}: {
  lang: Lang;
  slug: string;
  limit?: number;
}) => {
  return cacheFunc(
    async () => {
      const [result, err] = await query<ResponseDocs<Product>>((payload) => {
        return payload.find({
          collection: "products",
          where: {
            or: [
              {
                "taxonomies.category.slug": {
                  equals: slug,
                },
              },
              {
                "taxonomies.subCategory.slug": {
                  contains: slug,
                },
              },
            ],
          },

          limit: limit || 10,
          locale: lang,
        });
      });
      if (err) throw err;
      return result;
    },
    [`products-list`, lang, slug],
    {
      tags: [`product-list:${lang}-${slug}`],
    }
  )();
};
