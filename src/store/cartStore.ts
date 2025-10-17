"use client";

import { Cart, Product, Variant } from "@/payload-types";
import {
  addToCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "@/service/cart/actions";
import { create } from "zustand";

export interface CartItem {
  id: string;
  product: Product;
  variant?: Variant;
  quantity: number;
}

// Debounce utility
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

interface CartStore {
  cart: Cart | null;
  items: CartItem[];
  isOpen: boolean;
  showLoginModal: boolean;
  totalItems: number;
  subtotal: number;
  isLoading: boolean;

  // Actions
  addItem: (
    product: Product,
    variant?: Variant,
    quantity?: number
  ) => Promise<{ success: boolean; error?: string }>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  updateQuantityDebounced: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  showLogin: () => void;
  hideLogin: () => void;
  fetchCart: () => Promise<void>;
  syncCartFromPayload: (payloadCart: Cart) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: null,
  items: [],
  isOpen: false,
  showLoginModal: false,
  totalItems: 0,
  subtotal: 0,
  isLoading: false,

  addItem: async (product, variant, quantity = 1) => {
    const { items, cart } = get();

    const existingItemIndex = items.findIndex(
      (item) =>
        item.product.id === product.id && item.variant?.id === variant?.id
    );

    let optimisticItems: CartItem[];
    if (existingItemIndex >= 0) {
      optimisticItems = items.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      optimisticItems = [
        ...items,
        {
          id: `temp-${Date.now()}`,
          product,
          variant,
          quantity,
        },
      ];
    }

    const optimisticTotalItems = optimisticItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const optimisticSubtotal = optimisticItems.reduce((sum, item) => {
      const price =
        (item.variant?.priceInUSDEnabled && item.variant?.priceInUSD) ||
        (item.product.priceInUSDEnabled && item.product.priceInUSD) ||
        0;
      return sum + price * item.quantity;
    }, 0);

    // Cập nhật UI ngay lập tức
    set({
      items: optimisticItems,
      totalItems: optimisticTotalItems,
      subtotal: optimisticSubtotal,
      isLoading: false,
    });

    try {
      // Gọi API trong background
      const result = await addToCart(product.id, variant?.id, quantity);

      if (!result.success) {
        if (result.error === "NOT_AUTHENTICATED") {
          // Rollback optimistic update
          set({
            items,
            totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
          });
          set({ showLoginModal: true });
          return { success: false, error: "NOT_AUTHENTICATED" };
        }
        // Rollback on error
        set({
          items,
          totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
        });
        return { success: false, error: result.error };
      }

      // Sync với server data
      if (result.cart) {
        get().syncCartFromPayload(result.cart);
      }

      return { success: true };
    } catch (error) {
      // Rollback on error
      set({
        items,
        totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      });
      return { success: false, error: "UNKNOWN_ERROR" };
    }
  },

  removeItem: async (itemId) => {
    const { cart, items } = get();
    if (!cart) return;

    // Optimistic update - xóa item ngay lập tức
    const optimisticItems = items.filter(item => item.id !== itemId);
    const optimisticTotalItems = optimisticItems.reduce((sum, item) => sum + item.quantity, 0);
    const optimisticSubtotal = optimisticItems.reduce((sum, item) => {
      const price = (item.variant?.priceInUSDEnabled && item.variant?.priceInUSD) ||
                   (item.product.priceInUSDEnabled && item.product.priceInUSD) || 0;
      return sum + price * item.quantity;
    }, 0);

    set({ 
      items: optimisticItems, 
      totalItems: optimisticTotalItems, 
      subtotal: optimisticSubtotal 
    });

    try {
      const result = await removeCartItem(cart.id, itemId);
      if (result.success && result.cart) {
        get().syncCartFromPayload(result.cart);
      }
    } catch (error) {
      // Rollback on error
      set({ items });
      console.error("Remove item error:", error);
    }
  },

  updateQuantity: async (itemId, quantity) => {
    const { cart, items } = get();
    if (!cart) return;

    if (quantity <= 0) {
      get().removeItem(itemId);
      return;
    }

    // Optimistic update
    const optimisticItems = items.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    
    const optimisticTotalItems = optimisticItems.reduce((sum, item) => sum + item.quantity, 0);
    const optimisticSubtotal = optimisticItems.reduce((sum, item) => {
      const price = (item.variant?.priceInUSDEnabled && item.variant?.priceInUSD) ||
                   (item.product.priceInUSDEnabled && item.product.priceInUSD) || 0;
      return sum + price * item.quantity;
    }, 0);

    // Cập nhật UI ngay
    set({ 
      items: optimisticItems, 
      totalItems: optimisticTotalItems, 
      subtotal: optimisticSubtotal 
    });

    try {
      const result = await updateCartItem(cart.id, itemId, quantity);
      if (result.success && result.cart) {
        get().syncCartFromPayload(result.cart);
      }
    } catch (error) {
      // Rollback on error
      set({ items });
      console.error("Update quantity error:", error);
    }
  },

  updateQuantityDebounced: debounce((itemId: string, quantity: number) => {
    get().updateQuantity(itemId, quantity);
  }, 500),

  clearCart: () => {
    set({
      cart: null,
      items: [],
      totalItems: 0,
      subtotal: 0,
    });
  },

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const result = await getCart();
      if (result.success && result.cart) {
        get().syncCartFromPayload(result.cart);
      } else {
        set({ cart: null, items: [], totalItems: 0, subtotal: 0 });
      }
    } catch (error) {
      console.error("Fetch cart error:", error);
    }
    set({ isLoading: false });
  },

  syncCartFromPayload: (payloadCart: Cart) => {
    const items: CartItem[] = (payloadCart.items || [])
      .filter((item: any) => item.product && item.quantity > 0)
      .map((item: any) => ({
        id: item.id,
        product:
          typeof item.product === "object"
            ? item.product
            : { id: item.product },
        variant:
          typeof item.variant === "object"
            ? item.variant
            : item.variant
              ? { id: item.variant }
              : undefined,
        quantity: item.quantity,
      }));

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => {
      const price =
        (item.variant?.priceInUSDEnabled && item.variant?.priceInUSD) ||
        (item.product.priceInUSDEnabled && item.product.priceInUSD) ||
        0;
      return sum + price * item.quantity;
    }, 0);

    set({
      cart: payloadCart,
      items,
      totalItems,
      subtotal,
    });
  },

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  showLogin: () => set({ showLoginModal: true }),
  hideLogin: () => set({ showLoginModal: false }),
}));
