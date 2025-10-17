"use client";

import { Media } from "@/components/Media";
import { Button } from "@/components/ui/button";
import type { Media as MediaType } from "@/payload-types";
import type { CartItem as CartItemType } from "@/store/cartStore";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utilities/convertPrice";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useLocale } from "next-intl";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCartStore();
  const locale = useLocale();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex gap-3 rounded-lg border p-3"
    >
      {/* Product Image */}
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
        {item.product.gallery?.length && (
          <Media
            resource={
              (item.product.gallery[1]?.image[1] as MediaType) ??
              (item.product.gallery[0]?.image[0] as MediaType)
            }
            alt={item.product.title || ""}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h4 className="font-medium text-sm line-clamp-2">
          {item.product.title}
        </h4>

        {item.variant && (
          <p className="text-xs text-gray-500 mt-1">{item.variant.title}</p>
        )}

        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold text-sm">
            {formatPrice(
              item.variant?.priceInUSDEnabled
                ? item.variant?.priceInUSD && item.variant?.priceInUSD
                : item.product?.priceInUSDEnabled && item.product.priceInUSD,
              locale,
              item.variant?.options
            )}
          </span>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>

            <span className="w-8 text-center text-sm">{item.quantity}</span>

            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-red-500 hover:text-red-700"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
