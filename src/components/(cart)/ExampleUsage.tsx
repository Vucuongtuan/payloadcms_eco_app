"use client";

import { Product, Variant } from "@/payload-types";
import { OptimisticAddToCart } from "./OptimisticAddToCart";
import { OptimisticQuantitySelector } from "./OptimisticQuantitySelector";
import { useOptimisticCart } from "@/hooks/useOptimisticCart";

// Example sử dụng trong ProductCard
export const ProductCardExample = ({ product }: { product: Product }) => {
  return (
    <div className="border rounded-lg p-4">
      <h3>{product.title}</h3>
      <p>${product.priceInUSD}</p>
      
      {/* Sử dụng OptimisticAddToCart */}
      <OptimisticAddToCart product={product}>
        Thêm vào giỏ hàng
      </OptimisticAddToCart>
    </div>
  );
};

// Example sử dụng trong Cart
export const CartItemExample = ({ 
  itemId, 
  quantity 
}: { 
  itemId: string; 
  quantity: number; 
}) => {
  const { removeItem } = useOptimisticCart();

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div>Product info...</div>
      
      {/* Quantity selector với optimistic updates */}
      <OptimisticQuantitySelector 
        itemId={itemId}
        initialQuantity={quantity}
      />
      
      <button 
        onClick={() => removeItem(itemId)}
        className="text-red-500"
      >
        Xóa
      </button>
    </div>
  );
};
