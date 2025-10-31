import { Variant } from "@/payload-types";
import { Lang } from "@/types";
import { formatPrice } from "@/utilities/convertPrice";

interface PriceProps {
  price?: number | null;
  variants?: Variant; // Giá của variant
  variant?: "default" | "compact" | "detailed";
  className?: string;
  quantity?: number;
  lang: Lang;
}

export function Price({
  price,
  variants,
  variant = "default",
  className = "",
  quantity = 1,
  lang,
}: PriceProps) {
  const unitPrice = (() => {
    if (price != null) {
      if (
        variants?.priceInUSDEnabled &&
        variants.priceInUSD != null &&
        variants.priceInUSD < price
      ) {
        return variants.priceInUSD;
      }
      return price;
    }
    // fallback: không có price gốc nhưng variant có giá
    if (variants?.priceInUSDEnabled && variants.priceInUSD != null) {
      return variants.priceInUSD;
    }
    return null;
  })();

  if (unitPrice == null || quantity <= 0) return null;

  const totalPrice = unitPrice * quantity;

  const hasDiscount =
    variants?.priceInUSDEnabled &&
    variants.priceInUSD != null &&
    price != null &&
    variants.priceInUSD < price;

  const discountPercent =
    hasDiscount && price
      ? Math.round(((price - variants!.priceInUSD!) / price) * 100)
      : 0;
  const discountText = hasDiscount ? `${discountPercent}%` : "";

  // Render theo variant layout
  if (variant === "compact") {
    return (
      <div className={className}>
        {hasDiscount ? (
          <>
            <span className="line-through text-gray-500">
              {formatPrice(price! * quantity, lang)}
            </span>
            <span className="ml-2 font-semibold">
              {formatPrice(totalPrice, lang)}
            </span>
          </>
        ) : (
          <span className="font-semibold">{formatPrice(totalPrice, lang)}</span>
        )}
      </div>
    );
  }

  if (variant === "detailed") {
    return (
      <div className={className}>
        <div className="text-xl font-semibold">
          {formatPrice(totalPrice, lang)}
        </div>
        {hasDiscount && (
          <>
            <div className="text-sm text-gray-500 line-through">
              {formatPrice(price! * quantity, lang)}
            </div>
            <div className="text-sm text-green-600">Save {discountText}</div>
          </>
        )}
      </div>
    );
  }

  // default
  return (
    <div className={className}>
      {hasDiscount ? (
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold">
            {formatPrice(totalPrice, lang)}
          </span>
          <span className="text-lg text-gray-500 line-through">
            {formatPrice(price! * quantity, lang)}
          </span>
          <span className="text-lg border border-green-600 px-2 py-0 text-green-600">
            Save -{discountText}
          </span>
        </div>
      ) : (
        <span className="text-lg font-semibold">
          {formatPrice(totalPrice, lang)}
        </span>
      )}
    </div>
  );
}
