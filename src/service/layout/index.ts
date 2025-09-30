import { Announcement, AnnouncementSettings, Lang } from "@/types";
import { query } from "@/lib/tryCatch";
import { Setting } from "@/payload-types";
import { cacheFunc } from "@/lib/cacheFunc";

/* --- Find Settings Global ---
  * props:
      - lang: Lang
      - select: "nav" | "announcement"
  * cache tags: [`${select}-${lang}`]
  * return: Promise<T | null>
*/
export const findSettings = <T>(
  lang: Lang,
  select: "nav" | "announcement",
): Promise<T | null> => {
  return cacheFunc(
    async () => {
      const [result, err] = await query((payload) =>
        payload.findGlobal({ slug: "settings", locale: lang }),
      );
      if (err) throw err;

      if (select === "nav") {
        return (result as Setting).nav as T;
      } else if (select === "announcement") {
        return (result as Setting).announcement as T;
      }

      return result as T;
    },
    [select, lang],
    { tags: [`${select}-${lang}`] },
  )();
};
