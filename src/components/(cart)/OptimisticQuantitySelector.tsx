"use client";

import { useOptimisticCart } from "@/hooks/useOptimisticCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";

interface OptimisticQuantitySelectorProps {
  itemId: string;
  initialQuantity: number;
  min?: number;
  max?: number;
}

export const OptimisticQuantitySelector = ({
  itemId,
  initialQuantity,
  min = 1,
  max = 99,
}: OptimisticQuantitySelectorProps) => {
  const { updateQuantity, removeItem } = useOptimisticCart();
  const [quantity, setQuantity] = useState(initialQuantity);

  // Sync với store khi initialQuantity thay đổi
  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < min) {
      removeItem(itemId);
      return;
    }
    
    if (newQuantity > max) return;
    
    setQuantity(newQuantity);
    updateQuantity(itemId, newQuantity);
  };

  const increment = () => handleQuantityChange(quantity + 1);
  const decrement = () => handleQuantityChange(quantity - 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    handleQuantityChange(value);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={decrement}
        disabled={quantity <= min}
      >
        <Minus className="h-3 w-3" />
      </Button>
      
      <Input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        className="w-16 text-center"
        min={min}
        max={max}
      />
      
      <Button
        variant="outline"
        size="sm"
        onClick={increment}
        disabled={quantity >= max}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
};
