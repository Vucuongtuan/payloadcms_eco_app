import { Lang } from "@/types";

export const formatPrice = (
  price: string | number,
  lang: Lang,
  discount?: number
) => {
  const valueInCents = Number(price) || 0;

  const finalPriceInCents =
    discount && discount > 0
      ? valueInCents - (valueInCents * discount) / 100
      : valueInCents;

  const USD_TO_VND = 25000;

  let converted: number;
  let currency: string;
  let locale: string;
  let minimumFractionDigits = 0;

  if (lang === "en") {
    converted = finalPriceInCents / 100;
    currency = "USD";
    locale = "en-US";
    minimumFractionDigits = 2;
  } else {
    converted = (finalPriceInCents / 100) * USD_TO_VND;
    currency = "VND";
    locale = "vi-VN";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
  }).format(converted);
};
