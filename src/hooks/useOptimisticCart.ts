"use client";

import { useCartStore } from "@/store/cartStore";
import { Product, Variant } from "@/payload-types";
import { useState } from "react";

export const useOptimisticCart = () => {
  const {
    items,
    totalItems,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    updateQuantityDebounced,
    isOpen,
    openCart,
    closeCart,
  } = useCartStore();

  const [pendingActions, setPendingActions] = useState<Set<string>>(new Set());

  const optimisticAddItem = async (
    product: Product,
    variant?: Variant,
    quantity = 1
  ) => {
    const actionId = `add-${product.id}-${variant?.id || 'no-variant'}`;
    setPendingActions(prev => new Set(prev).add(actionId));

    try {
      const result = await addItem(product, variant, quantity);
      return result;
    } finally {
      setPendingActions(prev => {
        const newSet = new Set(prev);
        newSet.delete(actionId);
        return newSet;
      });
    }
  };

  const optimisticUpdateQuantity = (itemId: string, quantity: number) => {
    // Cập nhật UI ngay lập tức
    const optimisticItems = items.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    
    // Sử dụng debounced update để gọi API
    updateQuantityDebounced(itemId, quantity);
  };

  const optimisticRemoveItem = async (itemId: string) => {
    const actionId = `remove-${itemId}`;
    setPendingActions(prev => new Set(prev).add(actionId));

    try {
      await removeItem(itemId);
    } finally {
      setPendingActions(prev => {
        const newSet = new Set(prev);
        newSet.delete(actionId);
        return newSet;
      });
    }
  };

  return {
    items,
    totalItems,
    subtotal,
    isOpen,
    openCart,
    closeCart,
    addItem: optimisticAddItem,
    updateQuantity: optimisticUpdateQuantity,
    removeItem: optimisticRemoveItem,
    isPending: (actionId: string) => pendingActions.has(actionId),
    hasPendingActions: pendingActions.size > 0,
  };
};
