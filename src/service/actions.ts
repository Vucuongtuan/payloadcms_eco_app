"use server";

import { query } from "@/lib/tryCatch";
import { Product, Rate } from "@/payload-types";
import { Lang, PaginationOption, ResponseDocs } from "@/types";

interface FindProductsByCategoryProps extends PaginationOption {
  lang: Lang;
  categoryId: number;
}

export const findProductsByCategory = async ({
  lang,
  limit = 10,
  page = 1,
  categoryId,
}: FindProductsByCategoryProps): Promise<ResponseDocs<Product>> => {
  const [result, err] = await query<ResponseDocs<Product>>((payload) => {
    return payload.find({
      collection: "products",
      where: {
        _status: {
          equals: "published",
        },
        category: {
          id: {
            equals: categoryId,
          },
        },
      },
      locale: lang,
      limit: limit,
      page: page,
      soft: "-publishAt",
    });
  });
  if (err) throw err;
  return result;
};

export const updateRateGlobal = async ({ rates }: { rates: Rate["rates"] }) => {
  if (!rates) return;
  const fetchRate = await fetch("https://api.fxratesapi.com/latest?base=VND");
  const dataRate = await fetchRate.json();
  const newRates = rates.map((rate) => {
    if (!rate.currency || !dataRate.rates[rate.currency])
      return {
        ...rate,
        messageErr: "Currency isn't defined",
      };
    return {
      ...rate,
      rate: dataRate.rates[rate.currency],
    };
  });
  return newRates;
};
