"use client";

import { Button } from "@/components/ui/button";
import { Product, Variant } from "@/payload-types";
import { useCartStore } from "@/store/cartStore";
import { motion } from "framer-motion";
import { Heart, Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface ProductActionProps {
  product: Product;
  selectedVariant?: Variant;
  quantity?: number;
}

export default function ProductAction({
  product,
  selectedVariant,
  quantity = 1,
}: ProductActionProps) {
  const t = useTranslations("product.details");
  const { addItem, openCart, isLoading } = useCartStore();

  const handleAddToCart = async () => {
    const result = await addItem(product, selectedVariant, quantity);

    if (result.success) {
      toast.success(t("addedToCart"), {
        description: `${product.title} ${
          selectedVariant ? `(${selectedVariant.title})` : ""
        } x${quantity}`,
        action: {
          label: t("viewCart"),
          onClick: () => openCart(),
        },
      });
    } else if (result.error === "NOT_AUTHENTICATED") {
      // The cart store should handle showing the login modal
    } else {
      toast.error(t("addToCartError"));
    }
  };

  return (
    <motion.div
      className="flex items-center gap-3 mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      <Button
        size="lg"
        className="flex-1 bg-black text-white hover:bg-black/70 py-6 text-sm uppercase tracking-wider"
        aria-label={t("addToCart")}
        onClick={handleAddToCart}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader className="rotate-180 transition-all duration-300" />
            {t("adding")}
          </>
        ) : (
          t("addToCart")
        )}
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="py-6 px-4"
        aria-label="Add to wishlist"
      >
        <Heart className="h-5 w-5" />
      </Button>
    </motion.div>
  );
}
