import { Lang } from "@/types";
import { formatPrice } from "@/utilities/convertPrice";

interface PriceProps {
  price: number;
  discount?: string | null;
  variant?: "default" | "compact" | "detailed";
  className?: string;
  lang: Lang;
}

export function Price({
  price,
  discount,
  variant = "default",
  className = "",
  lang,
}: PriceProps) {
  // const t = await getTranslations("ProfilePage");
  const discountPercent = discount ? parseFloat(discount.replace("%", "")) : 0;
  const hasDiscount = discountPercent > 0;

  if (variant === "compact") {
    return (
      <div className={className}>
        {hasDiscount ? (
          <>
            <span className="line-through text-gray-500">
              {formatPrice(price, lang)}
            </span>
            <span className="ml-2 font-semibold">
              {formatPrice(price, lang, discountPercent)}
            </span>
          </>
        ) : (
          <span className="font-semibold">{formatPrice(price, lang)}</span>
        )}
      </div>
    );
  }

  if (variant === "detailed") {
    return (
      <div className={className}>
        <div className="text-xl font-semibold">
          {formatPrice(price, lang, discountPercent)}
        </div>
        {hasDiscount && (
          <>
            <div className="text-sm text-gray-500 line-through">
              {formatPrice(price, lang)}
            </div>
            <div className="text-sm text-green-600">Save {discount}</div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      {hasDiscount ? (
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold">
            {formatPrice(price, lang, discountPercent)}
          </span>
          <span className="text-lg text-gray-500 line-through">
            {formatPrice(price, lang)}
          </span>
          <span className="text-lg border border-green-600 px-2 py-0 text-green-600">
            Save -{discount}
          </span>
        </div>
      ) : (
        <span className="text-lg font-semibold">
          {formatPrice(price, lang)}
        </span>
      )}
    </div>
  );
}
