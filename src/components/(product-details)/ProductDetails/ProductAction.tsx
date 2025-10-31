"use client";

import { AddToCart } from "@/components/Cart/AddToCart";
import { Button } from "@/components/ui/button";
import { Product, Variant } from "@/payload-types";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Suspense } from "react";

interface ProductActionProps {
  product: Product;
  selectedVariant: Variant | null;
}

export default function ProductAction({
  product,
  selectedVariant,
}: ProductActionProps) {
  return (
    <motion.div
      className="flex items-center gap-3 mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      <Suspense fallback={null}>
        <AddToCart
          product={product}
          selectedVariant={selectedVariant || null}
        />
      </Suspense>
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
