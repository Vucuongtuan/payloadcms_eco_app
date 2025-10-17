"use client";
import { RichText } from "@/components/RichText";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category, Product } from "@/payload-types";
import { Lang } from "@/types";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { useMemo } from "react";
import { ColorSelector } from "./ColorSelector";
import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { SizeSelector } from "./SizeSelector";
import ProductAction from "./ProductAction";
import { useProductVariants } from "./useProductVariants";

interface ProductDetailsProps {
  doc: Product;
  lang: Lang;
}

export default function ProductDetails(props: ProductDetailsProps) {
  const { doc, lang } = props;

  const {
    colorVariants,
    sizeVariants,
    selectedColor,
    selectedSize,
    selectedVariant,
    handleColorChange,
    handleSizeChange,
  } = useProductVariants(doc);

  const selectedGalleryItem = useMemo(() => {
    if (selectedColor) {
      return (
        colorVariants.find(
          (item) => (item.variantOption as any)?.id === selectedColor.id
        ) || null
      );
    }
    return doc.gallery?.[0] || null;
  }, [selectedColor, colorVariants, doc.gallery]);

  const currentData = useMemo(() => {
    const currentPrice = selectedVariant?.priceInUSD || doc.priceInUSD;
    const currentImages = selectedGalleryItem?.image || doc.gallery;

    return {
      ...doc,
      priceInUSD: currentPrice,
      gallery: currentImages ? [{ image: currentImages }] : doc.gallery,
    };
  }, [selectedVariant, selectedGalleryItem, doc]);

  return (
    <section className="w-full h-auto flex gap-8">
      <ProductGallery currentData={currentData} />

      <article className="flex-1 h-fit sticky top-10 px-4">
        <ProductInfo
          data={currentData}
          lang={lang}
          selectedVariant={selectedVariant}
          category={doc.taxonomies.category as Category}
        />

        <ColorSelector
          colorVariants={colorVariants}
          selectedColor={selectedColor}
          handleColorChange={handleColorChange}
          selectedGalleryItem={selectedGalleryItem}
        />

        <SizeSelector
          sizeVariants={sizeVariants}
          selectedSize={selectedSize}
          onSizeChange={handleSizeChange}
        />

        <ProductAction 
          product={currentData} 
          selectedVariant={selectedVariant}
        />

        <footer className="smallContent mt-6">
          <Tabs
            defaultValue={doc.shortContent?.[0].name}
            className="w-full space-y-2"
          >
            <TabsList className="w-full ">
              {doc.shortContent &&
                doc.shortContent.map((c) => (
                  <TabsTrigger
                    value={c.name}
                    key={c.name}
                    className={`shadow-none border-none border-0`}
                  >
                    {c.name.toUpperCase()}
                  </TabsTrigger>
                ))}
            </TabsList>
            {doc.shortContent &&
              doc.shortContent.map((c) => (
                <TabsContent value={c.name} key={c.name}>
                  <RichText
                    data={c.content as SerializedEditorState}
                    className="prose prose-xs px-0 w-full max-w-full"
                    enableGutter={false}
                    enableProse={false}
                  />
                </TabsContent>
              ))}
          </Tabs>
        </footer>
      </article>
    </section>
  );
}
