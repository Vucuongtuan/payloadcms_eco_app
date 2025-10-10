'use client';

import { VariantsProduct } from "@/payload-types";

interface VariantSelectorProps {
  variants?: (number | VariantsProduct)[] | null;
  selectedVariant: VariantsProduct | null;
  onVariantChange: (variant: VariantsProduct) => void;
}

export function VariantSelector({ variants, selectedVariant, onVariantChange }: VariantSelectorProps) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Color</h3>
      <div className="flex gap-2">
        {variants.map((variant) => {
          const v = typeof variant === 'object' ? variant : null;
          if (!v) return null;
          
          return (
            <button
              key={v.id}
              onClick={() => onVariantChange(v)}
              className={`w-8 h-8 rounded-full border-2 ${
                selectedVariant?.id === v.id ? 'border-black' : 'border-gray-300'
              }`}
              style={{ backgroundColor: v.color }}
              title={v.title}
            />
          );
        })}
      </div>
    </div>
  );
}
