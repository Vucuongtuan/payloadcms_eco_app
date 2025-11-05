import { query } from "@/lib/tryCatch";

let LIMIT_STATIC_PRODUCT = process.env.LIMIT_STATIC_PRODUCT || 40;
let LIMIT_STATIC_CATEGORY = process.env.LIMIT_STATIC_CATEGORY || 20;
let LIMIT_STATIC_PAGE = process.env.LIMIT_STATIC_PAGE || 10;

export const genStaticParams = async ({
  collection,
}: {
  collection: "pages" | "categories" | "products";
}) => {
  let limit = 0;
  if (collection === "products") {
    limit = Number(LIMIT_STATIC_PRODUCT);
  } else if (collection === "categories") {
    limit = Number(LIMIT_STATIC_CATEGORY);
  } else if (collection === "pages") {
    limit = Number(LIMIT_STATIC_PAGE);
  }
  const [result, err] = await query<any>((payload) =>
    payload.find({
      collection,
      where: {
        _status: {
          equals: "published",
        },
      },
      sort: "-publishedAt",
      limit,
      select: {
        slug: true,
      },
    })
  );
  if (err) throw err;
  return result.docs.map((item: { slug: string }) => [
    {
      slug: item.slug,
      lang: "vi",
    },
    {
      slug: item.slug,
      lang: "en",
    },
  ]);
};
