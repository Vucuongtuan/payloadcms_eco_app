import { cacheFunc } from "@/lib/cacheFunc";
import { query } from "@/lib/tryCatch";
import { Post } from "@/payload-types";
import { Lang, ResponseDocs } from "@/types";
import { unstable_cache } from "next/cache";

var LIMIT = 20;

export async function findPostDoc(): Promise<Post[] | Error> {
  return cacheFunc(
    async () => {
      const [vi, en] = await Promise.all([
        query<ResponseDocs<Post>>((payload) => {
          return payload.find({
            collection: "posts",
            limit: LIMIT,
            locale: "vi",
            soft: "-publishAt",
            select: {
              slug: true,
            },
            where: {},
          });
        }),
        query<ResponseDocs<Post>>((payload) => {
          return payload.find({
            collection: "posts",
            limit: LIMIT,
            locale: "en",
            soft: "-publishAt",
            select: {
              slug: true,
            },
            where: {
              and: [
                {
                  _status: {
                    equals: "published",
                  },
                },
              ],
            },
          });
        }),
      ]);

      const [viDoc, viErr] = vi;
      if (viErr) throw viErr;

      const [enDoc, enErr] = en;
      if (enErr) throw enErr;

      return [...viDoc.docs, ...enDoc.docs];

      //   if () throw err;
      //   return result.docs as Post[];
    },
    [`post-static`],
    {
      tags: [`post-static`],
    },
  )();
}

export async function findLatestPostByLang(
  lang: Lang,
): Promise<Post[] | Error> {
  return cacheFunc(
    async () => {
      const [result, err] = await query<ResponseDocs<Post>>((payload) => {
        return payload.find({
          collection: "posts",
          where: {
            status: "published",
          },
          limit: LIMIT,
          locale: lang,
          select: {
            slug: true,
          },
          soft: "-publishAt",
        });
      });

      if (err) throw err;
      return result.docs as Post[];
    },
    [`post-static`, lang],
    {
      tags: [`post-static-${lang}`],
    },
  )();
}
