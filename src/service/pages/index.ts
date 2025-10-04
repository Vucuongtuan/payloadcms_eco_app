import { cacheFunc } from "@/lib/cacheFunc";
import { query } from "@/lib/tryCatch";
import { Page } from "@/payload-types";
import { Lang, ResponseDocs } from "@/types";

export async function findPageDoc(
  lang: Lang,
  slug: string,
): Promise<Page | Error> {
  return cacheFunc(
    async () => {
      const [result, err] = await query<ResponseDocs<Page>>((payload) => {
        return payload.find({
          collection: "pages",
          where: {
            slug: {
              equals: slug
            },
            _status: {
              equals: "published"
            }
          },
          limit: 1,
          locale: lang,
        });
      });
      if (err) throw err;
      console.log({result:result.docs[0],slug})
      return result.docs[0] as Page;
    },
    [`page`, lang, slug],
    {
      tags: [`page-${lang}-${slug}`],
    },
  )();
}
