"use client";

import { buildVariantSelectData } from "@/lib/product-utils";
import { cn } from "@/lib/utils";
import { Product, VariantsProduct } from "@/payload-types";
import { Lang } from "@/types";
import { formatPrice } from "@/utilities/convertPrice";
import Link from "next/link";
import { useState } from "react";
import { Image } from "../Media/Image";
import { SizeSelector } from "./SizeSelector";
import { VariantsColor } from "./VariantsColor";

export const ProductCard = ({ doc, lang }: { doc: Product; lang: Lang }) => {
  const variants = doc.variantsOption as VariantsProduct[];
  const variantData = buildVariantSelectData({
    doc,
    variants,
    lang: lang as Lang,
  });

  const [selectedVariant, setSelectedVariant] = useState(variantData[0]);
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <article className="flex flex-col gap-2 group w-full">
      <header className="flex-1 relative ">
        <Link href={`/products/${selectedVariant.slug}`} className="block">
          <figure className="relative h-full w-full aspect-figcard">
            <Image
              resource={
                (selectedVariant.thumbnail || doc.thumbnail)[isHover ? 1 : 0]
              }
              fill
              imgClassName={cn("w-full h-full object-cover")}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            />
            <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/40 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <SizeSelector sizes={selectedVariant.sizes} />
          </figure>
        </Link>
      </header>
      <div className="px-4 py-2  space-y-2 flex flex-col items-start">
        <Link
          href={`/products/${selectedVariant.slug}`}
          className="block w-full"
        >
          <h3 className="text-base font-semibold text-gray-900 hover:text-primary-600">
            {selectedVariant.title}
          </h3>
        </Link>

        <p className="flex items-center gap-2">
          {selectedVariant.pricing.discount ? (
            <>
              <span className={cn("line-through text-sm text-gray-400")}>
                {formatPrice(selectedVariant.pricing.price, lang)}
              </span>
              <span className="text-[18px] font-semibold text-neutral-900">
                {formatPrice(
                  selectedVariant.pricing.price,
                  lang,
                  selectedVariant.pricing.discount
                )}
              </span>
            </>
          ) : (
            <span>{formatPrice(selectedVariant.pricing.price, lang)}</span>
          )}
        </p>
      </div>

      <footer className="px-4 pb-2 space-y-2">
        <VariantsColor
          data={variantData}
          selectedColor={selectedVariant.color}
          onColorSelect={setSelectedVariant}
        />
      </footer>
    </article>
  );
};
