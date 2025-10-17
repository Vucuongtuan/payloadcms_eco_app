import { ProductVariant } from "@/lib/product-utils";

export const VariantsColor = (props: {
  data: ProductVariant[];
  selectedColor?: string;
  onColorSelect: (variant: ProductVariant) => void;
}) => {
  const { data, selectedColor, onColorSelect } = props;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-2">
        {data.slice(0, 4).map((variant, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.preventDefault();
              onColorSelect(variant);
            }}
            className={`h-5 w-5 rounded-full border-2 shadow-sm hover:scale-110 transition-all cursor-pointer ${
              variant.color === selectedColor
                ? "border-gray-800 ring-2 ring-gray-300"
                : "border-gray-300"
            }`}
            style={{ backgroundColor: variant.color }}
            title={variant.variantName}
          />
        ))}
        {data.length > 4 && (
          <span className="text-xs text-gray-400 ml-1">+{data.length - 4}</span>
        )}
      </div>
    </div>
  );
};
