"use server";

import { cacheFunc } from "@/lib/cacheFunc";
import { query } from "@/lib/tryCatch";
import { ExchangeRate } from "@/payload-types";

export async function findExchangeRate() {
  return cacheFunc(
    async () => {
      const [result, err] = await query<ExchangeRate>((payload) =>
        payload.findGlobal({
          slug: "exchangeRate",
        })
      );
      if (err) throw err;
      return result;
    },
    ["exchangeRate"],
    {
      tags: ["exchangeRate"],
    }
  )();
}
