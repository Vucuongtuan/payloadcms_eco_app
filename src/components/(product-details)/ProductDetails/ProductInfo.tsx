import { cn } from "@/lib/utils";
import { Lang } from "@/types";
import { formatPrice } from "@/utilities/convertPrice";

interface ProductInfoProps {
  title: string;
  description?: string | null;
  pricing: {
    price: string;
    discount: number;
  };
  lang: Lang;
}

export function ProductInfo({
  title,
  description,
  pricing,
  lang,
}: ProductInfoProps) {
  return (
    <header className="py-4 space-y-4">
      <h1 className="text-4xl">
        {title} - {lang}
      </h1>
      {description && <p className="text-sm text-gray-600">{description}</p>}
      <div className="text-2xl font-semibold">
        {pricing.discount > 0 ? (
          <>
            <span className="text-sm text-primary font-medium tracking-tight border-red-400 border-1 px-4 py-1">
              Save {pricing.discount}%
            </span>
            <br />
            <span className={cn("line-through text-sm text-gray-400")}>
              {formatPrice(pricing.price, lang)}
            </span>
            <span className="text-[18px] ml-2 font-semibold text-neutral-900">
              {formatPrice(pricing.price, lang, pricing.discount)}
            </span>
          </>
        ) : (
          <span>{formatPrice(pricing.price, lang)}</span>
        )}
      </div>
      <hr className="w-1/3 h-[1px] mt-8 bg-gray-300" />
    </header>
  );
}
