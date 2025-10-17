import { Product, Variant } from "@/payload-types";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";

export function useProductVariants(doc: Product) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const variants =
    (doc.variants?.docs?.filter((v) => typeof v === "object") as Variant[]) ||
    [];

  const colorVariants =
    doc.gallery?.filter(
      (item) =>
        item.variantOption &&
        typeof item.variantOption === "object" &&
        item.variantOption.variantType &&
        typeof item.variantOption.variantType === "object" &&
        item.variantOption.variantType.name === "Colors"
    ) || [];

  const sizeVariantType = doc.variantTypes?.find(
    (vt) => typeof vt === "object" && vt.name === "Sizes"
  );
  const sizeVariants =
    sizeVariantType &&
    typeof sizeVariantType === "object" &&
    sizeVariantType.options &&
    "docs" in sizeVariantType.options
      ? (sizeVariantType.options.docs as any[])
      : [];

  const [selectedColor, setSelectedColor] = useState<any | null>(() => {
    const variantParam = searchParams.get("variant");
    if (variantParam && colorVariants.length > 0) {
      const foundItem = colorVariants.find((item) => {
        const option = item.variantOption as any;
        return option?.value === variantParam || option?.label === variantParam;
      });
      return foundItem?.variantOption || null;
    }
    return colorVariants.length > 0
      ? (colorVariants[0].variantOption as any)
      : null;
  });

  const [selectedSize, setSelectedSize] = useState<any | null>(() => {
    const sizeParam = searchParams.get("size");
    if (sizeParam && sizeVariants.length > 0) {
      const foundSize = sizeVariants.find((s) => s.value === sizeParam);
      return foundSize || sizeVariants[0];
    }
    return sizeVariants.length > 0 ? sizeVariants[0] : null;
  });

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  useEffect(() => {
    if (selectedColor && selectedSize) {
      const matchingVariant = variants.find((variant) => {
        const hasColor = variant.options?.some(
          (opt) => (opt as any)?.id === selectedColor.id
        );
        const hasSize = variant.options?.some(
          (opt) => (opt as any)?.id === selectedSize.id
        );
        return hasColor && hasSize;
      });
      setSelectedVariant(matchingVariant || null);
    }
  }, [selectedColor, selectedSize, variants]);

  const handleColorChange = (colorOption: any) => {
    setSelectedColor(colorOption);
    const params = new URLSearchParams(searchParams);
    if (colorOption.id !== (colorVariants[0].variantOption as any).id) {
      params.set("variant", colorOption.label);
    } else {
      params.delete("variant");
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  };

  const handleSizeChange = (size: any) => {
    setSelectedSize(size);
    const params = new URLSearchParams(searchParams);
    if (size.id !== sizeVariants[0].id) {
      params.set("size", size.value);
    } else {
      params.delete("size");
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  };

  return {
    variants,
    colorVariants,
    sizeVariants,
    selectedColor,
    selectedSize,
    selectedVariant,
    handleColorChange,
    handleSizeChange,
  };
}
