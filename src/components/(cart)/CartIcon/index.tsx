"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";

export default function CartIcon() {
  const { totalItems, toggleCart } = useCartStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleCart}
      className="relative"
      aria-label={`Shopping cart with ${totalItems} items`}
    >
      <ShoppingCart className="h-5 w-5" />
      
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
          >
            {totalItems > 99 ? "99+" : totalItems}
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
