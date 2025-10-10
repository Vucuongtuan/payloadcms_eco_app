import { Lang } from "@/types";

export const formatPrice = (
  price: string | number,
  lang: Lang,
  discount?: number
) => {
  const value = Number(String(price).replace(/\./g, "")) || 0;

  const finalPrice =
    discount && discount > 0 ? value - (value * discount) / 100 : value;

  // update convert price
  const VND_TO_USD = 1 / 25000;

  const converted = lang === "en" ? finalPrice * VND_TO_USD : finalPrice;

  const currency = lang === "en" ? "USD" : "VND";
  const locale = lang === "en" ? "en-US" : "vi-VN";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(converted);
};
