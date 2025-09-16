import { Setting } from "@/payload-types";
import { Announcement, AnnouncementSettings, Lang } from "@/types";
import { query, queryCache, Result } from "@/lib/tryCatch";
import { unstable_cache } from "next/cache";

const REVALIDATE_TIME = process.env.REVALIDATE_TIME;

/* --- Find Settings Global ---
  * props:
      - lang: Lang
      - select: "nav" | "announcement"
  * cache tags: [`${select}-${lang}`]
  * return: Promise<T | null>
*/
export const findSettings = async <T extends any = Setting>(
  lang: Lang,
  select: "nav" | "announcement",
): Promise<T | null> => {
  return unstable_cache(
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
    {
      tags: [`${select}-${lang}`],
      ...(REVALIDATE_TIME ? { revalidate: parseInt(REVALIDATE_TIME) } : {}),
    },
  )();
};
