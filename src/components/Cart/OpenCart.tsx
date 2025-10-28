import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export function OpenCartButton({
  className,
  quantity,
  ...rest
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <Button
      variant="nav"
      size="clear"
      className="relative p-0 flex items-center justify-center hover:bg-zinc-100 transition-colors duration-150 group rounded-lg"
      {...rest}
    >
      <div className="flex items-center justify-center w-8 h-8">
        <ShoppingCart className="text-zinc-700 size-5 group-hover:text-zinc-900 transition-colors" />
      </div>

      {quantity && quantity > 0 && (
        <span
          className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] text-[11px] font-medium
                 flex items-center justify-center rounded-full bg-red-500 text-white
                 shadow-sm ring-1 ring-white"
        >
          {quantity}
        </span>
      )}
    </Button>
  );
}
