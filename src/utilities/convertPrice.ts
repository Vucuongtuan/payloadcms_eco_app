import { Lang } from "@/types";

export const formatPrice = (price: string | number, lang: Lang) => {
  const value = Number(String(price).replace(/\./g, "")) || 0;

  // update convert price
  const VND_TO_USD = 1 / 25000;

  const converted = lang === "en" ? value * VND_TO_USD : value;

  const currency = lang === "en" ? "USD" : "VND";
  const locale = lang === "en" ? "en-US" : "vi-VN";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(converted);
};
