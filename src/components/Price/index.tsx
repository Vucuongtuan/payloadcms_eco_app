"use client";

import { Lang } from "@/types";
import { useCurrency } from "@payloadcms/plugin-ecommerce/client/react";
import React from "react";

type Props = {
  amount: number;
  originalAmount?: number;
  discountPercent?: number;
  className?: string;
  as?: "span" | "p";
  lang: Lang;
};

export const Price = ({
  amount,
  originalAmount,
  discountPercent,
  className,
  as = "p",
  lang,
}: Props & React.ComponentProps<"p">) => {
  const { formatCurrency } = useCurrency();
  const Element = as;

  return (
    <Element
      className={`flex items-center gap-3 ${className || ""}`}
      suppressHydrationWarning
    >
      {/* Nếu có giảm giá thì show badge */}
      {discountPercent && (
        <span className="bg-red-600 text-white text-xs px-2 py-[1px] rounded-md font-medium">
          -{discountPercent}%
        </span>
      )}

      <span className="font-semibold text-foreground">
        {formatCurrency(amount)}
      </span>

      {originalAmount && (
        <span className="line-through opacity-50 text-muted-foreground">
          {formatCurrency(originalAmount)}
        </span>
      )}
    </Element>
  );
};
