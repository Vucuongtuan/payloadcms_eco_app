import { cacheFunc } from "@/lib/cacheFunc";
import { query } from "@/lib/tryCatch";
import { Lang } from "@/types";



/* --- Find Global By Lang ---
  * props:
      - lang: Lang
      - select: "header" | "footer"
  * cache tags: [`${select}-${lang}`]
  * return: Promise<T | null>
*/

export const findGlobal = <T>(lang:Lang,select:'header' | 'footer') : Promise<T | null> => {
  return cacheFunc(
    async () => {
      const [result, err] = await query((payload) =>
        payload.findGlobal({ slug: select, locale: lang }),
      );
      
      if (err) throw err;
      return result as T;
    },
    [select, lang],
    { tags: [`${select}-${lang}`] },
  )();
}