"use client";

import { ReactNode, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import CartDrawer from "../CartDrawer";
import LoginModal from "../LoginModal";

interface CartProviderProps {
  children: ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  const { showLoginModal, hideLogin, fetchCart } = useCartStore();

  useEffect(() => {
    // Fetch cart on mount if user is authenticated
    fetchCart();
  }, [fetchCart]);

  return (
    <>
      {children}
      <CartDrawer />
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={hideLogin} 
      />
    </>
  );
}
