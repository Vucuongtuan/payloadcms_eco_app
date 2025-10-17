"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utilities/convertPrice";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import CartItem from "./CartItem";

export default function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, clearCart } = useCartStore();

  const t = useTranslations("cart");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-primary-background shadow-xl"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b p-4">
                <h2 className="text-lg font-semibold">
                  {t("title")} ({items.length})
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeCart}
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-4 rounded-full bg-gray-100 p-6">
                      <svg
                        className="h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                      {t("empty.title")}
                    </h3>
                    <p className="text-gray-500">{t("empty.description")}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t p-4 space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between text-lg font-semibold">
                    <span>{t("subtotal")}</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button className="w-full" size="lg">
                      {t("checkout")}
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={clearCart}
                    >
                      {t("clear")}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
