"use client";

import { Product, Variant } from "@/payload-types";
import { useOptimisticCart } from "@/hooks/useOptimisticCart";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface OptimisticAddToCartProps {
  product: Product;
  variant?: Variant;
  quantity?: number;
  children?: React.ReactNode;
}

export const OptimisticAddToCart = ({
  product,
  variant,
  quantity = 1,
  children,
}: OptimisticAddToCartProps) => {
  const { addItem } = useOptimisticCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    try {
      const result = await addItem(product, variant, quantity);
      
      if (result.success) {
        toast.success("Đã thêm vào giỏ hàng!");
      } else {
        if (result.error === "NOT_AUTHENTICATED") {
          toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
        } else {
          toast.error("Có lỗi xảy ra, vui lòng thử lại");
        }
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button 
      onClick={handleAddToCart} 
      disabled={isAdding}
      className="w-full"
    >
      {isAdding ? "Đang thêm..." : children || "Thêm vào giỏ hàng"}
    </Button>
  );
};
