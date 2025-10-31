import { Variant } from "@/payload-types";
import { Lang } from "@/types";

export const getPrice = ({
  priceInUSD,
  variants,
  lang = "vi",
}: {
  priceInUSD: number;
  variants?: Variant;
  lang?: Lang;
}) => {
  let price = priceInUSD as number;
  if (variants && variants.priceInUSDEnabled && variants.priceInUSD) {
    price = variants.priceInUSD;
  }
  return price;
};
