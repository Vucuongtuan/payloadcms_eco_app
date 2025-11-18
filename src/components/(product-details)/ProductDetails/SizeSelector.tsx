"use client";

import { motion } from "framer-motion";

interface SizeSelectorProps {
  sizeVariants: any[];
  selectedSize: any;
  onSizeChange: (size: any) => void;
}

export function SizeSelector({
  sizeVariants,
  selectedSize,
  onSizeChange,
}: SizeSelectorProps) {
  if (sizeVariants.length === 0) return <>null</>;

  return (
    <div className="space-y-3 mt-6">
      <h3 className="text-sm font-medium">Size</h3>
      <div className="grid grid-cols-5 gap-2">
        {sizeVariants.map((item, idx) => (
          <motion.button
            key={idx}
            onClick={() => onSizeChange(item)}
            className={`border py-3 text-center text-sm transition-colors ${
              selectedSize?.id === item.id
                ? "border-foreground bg-foreground text-background"
                : "border-gray-300 hover:border-gray-400"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-pressed={selectedSize?.id === item.id}
            aria-label={`Size ${item.label}`}
          >
            {item.value.toUpperCase()}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
