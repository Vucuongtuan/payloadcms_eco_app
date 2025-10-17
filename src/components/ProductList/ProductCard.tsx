"use client";

import { Product } from "@/payload-types";
import { Lang } from "@/types";
import { formatPrice } from "@/utilities/convertPrice";
import Link from "next/link";
import { useState } from "react";
import ProductImage from "./ProductImage";

export const ProductCard = ({ doc, lang }: { doc: Product; lang: Lang }) => {
  const colorVariants =
    doc.gallery?.filter(
      (item) =>
        item.variantOption &&
        typeof item.variantOption === "object" &&
        item.variantOption.variantType &&
        typeof item.variantOption.variantType === "object" &&
        item.variantOption.variantType.name === "Colors"
    ) || [];

  const [selectedGalleryItem, setSelectedGalleryItem] = useState(
    colorVariants[0] || null
  );

  // Find matching variant for selected gallery item
  const matchingVariant =
    selectedGalleryItem &&
    doc.variants?.docs?.find((variant) => {
      const v = typeof variant === "object" ? variant : null;
      return v?.options?.some(
        (option) =>
          typeof option === "object" &&
          option.id === (selectedGalleryItem.variantOption as any)?.id
      );
    });

  const currentVariant =
    typeof matchingVariant === "object" ? matchingVariant : null;
  const currentPrice = currentVariant?.priceInUSD || doc.priceInUSD;
  const currentImages = selectedGalleryItem?.image || doc.gallery?.[0]?.image;
  const localeLink = lang === "vi" ? "" : `/${lang}`;
  return (
    <article className="flex flex-col gap-2 group w-full">
      <header className="flex-1 relative">
        <Link href={`${localeLink}/products/${doc.slug}`} className="block">
          <ProductImage
            doc={{
              ...doc,
              gallery: currentImages ? [{ image: currentImages }] : doc.gallery,
            }}
          />
        </Link>
      </header>

      <div className="px-4 py-2 space-y-2 flex flex-col items-start">
        <Link
          href={`${localeLink}/products/${doc.slug}`}
          className="block w-full"
        >
          <h3 className="text-sm md:text-base font-semibold text-gray-900 hover:text-primary-600">
            {doc.title}
          </h3>
        </Link>

        {doc.priceInUSDEnabled && currentPrice && (
          <p className="flex items-center gap-2">
            <span className="text-sm md:text-[18px] font-semibold text-neutral-900">
              {formatPrice(currentPrice, lang)}
            </span>
          </p>
        )}
      </div>

      <footer className="px-4 pb-2 space-y-2">
        {colorVariants.length > 0 && (
          <div className="flex gap-1">
            {colorVariants.slice(0, 4).map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedGalleryItem(item)}
                className={`w-4 h-4 rounded-full border-2 ${
                  selectedGalleryItem?.id === item.id
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: (item.variantOption as any)?.value }}
                title={(item.variantOption as any)?.label}
              />
            ))}
            {colorVariants.length > 4 && (
              <span className="text-xs text-gray-500">
                +{colorVariants.length - 4}
              </span>
            )}
          </div>
        )}
      </footer>
    </article>
  );
};
