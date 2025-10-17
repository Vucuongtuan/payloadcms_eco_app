"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/store/cartStore";
import { Product, Variant } from "@/payload-types";
import { toast } from "sonner";

interface ProductActionProps {
  product: Product;
  selectedVariant?: Variant;
  quantity?: number;
}

export default function ProductAction({ 
  product, 
  selectedVariant, 
  quantity = 1 
}: ProductActionProps) {
  const t = useTranslations("product.details");
  const { addItem, openCart, isLoading } = useCartStore();

  const handleAddToCart = async () => {
    const result = await addItem(product, selectedVariant, quantity);
    
    if (result.success) {
      toast.success(t("addedToCart"), {
        description: `${product.title} ${selectedVariant ? `(${selectedVariant.title})` : ''} x${quantity}`,
        action: {
          label: t("viewCart"),
          onClick: () => openCart(),
        },
      });
    } else if (result.error === "NOT_AUTHENTICATED") {
      // Modal sẽ tự động hiển thị từ store
    } else {
      toast.error(t("addToCartError"));
    }
  };

  return (
    <motion.div
      className="flex gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      <Button
        size="lg"
        className="flex-1 bg-foreground py-6 text-sm uppercase tracking-wider text-background transition-colors hover:bg-foreground/90"
        aria-label={t("addToCart")}
        onClick={handleAddToCart}
        disabled={isLoading}
      >
        {isLoading ? t("adding") : t("addToCart")}
      </Button>
    </motion.div>
  );
}
