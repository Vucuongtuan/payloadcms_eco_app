"use client";

import { Product, VariantsProduct } from "@/payload-types";
import { Lang } from "@/types";
import { useMemo, useState } from "react";
import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { VariantSelector } from "./VariantSelector";

interface ProductDetailsClientProps {
  doc: Product;
  lang: Lang;
}

export function ProductDetailsClient({ doc, lang }: ProductDetailsClientProps) {
  const variants =
    (doc.variantsOption?.filter(
      (v) => typeof v === "object"
    ) as VariantsProduct[]) || [];
  const [selectedVariant, setSelectedVariant] =
    useState<VariantsProduct | null>(variants.length > 0 ? variants[0] : null);

  const currentData = useMemo(() => {
    if (selectedVariant) {
      return {
        title: selectedVariant.title,
        description: doc.description,
        gallery: selectedVariant.gallery || doc.gallery,
        pricing: selectedVariant.pricing,
      };
    }
    return {
      title: doc.title,
      description: doc.description,
      gallery: doc.gallery,
      pricing: doc.pricing,
    };
  }, [selectedVariant, doc]);

  return (
    <section className="w-full h-auto flex gap-12">
      <ProductGallery gallery={currentData.gallery} />

      <article className="flex-1 h-fit sticky top-0">
        <ProductInfo
          title={currentData.title}
          description={currentData.description}
          pricing={currentData.pricing}
          lang={lang}
        />

        <div className="flex flex-col space-y-6">
          <VariantSelector
            variants={doc.variantsOption}
            selectedVariant={selectedVariant}
            onVariantChange={setSelectedVariant}
          />
        </div>

        <footer>
          {/* <RichText data={content as SerializedEditorState} /> */}
        </footer>
      </article>
    </section>
  );
}
