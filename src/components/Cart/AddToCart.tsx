"use client";

import { Button } from "@/components/ui/button";
import type { Product, Variant } from "@/payload-types";

import { useCart } from "@payloadcms/plugin-ecommerce/client/react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
type Props = {
  product: Product;
  selectedVariant: Variant | null;
  quantity?: number;
};

export function AddToCart({ product, selectedVariant, quantity }: Props) {
  const { addItem, cart } = useCart();
  const t = useTranslations("product.details");
  const [messageAction, setMessageAction] = useState(t("addToCart"));

  const addToCart = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setMessageAction(t("adding"));
      addItem(
        {
          product: product.id,
          variant: selectedVariant?.id ?? undefined,
        },
        quantity || 1
      ).then((doc) => {
        console.log("Added to cart:", doc);
        toast.success("Item added to cart.");
        setMessageAction(t("addedToCart"));
      });
    },
    [addItem, product, selectedVariant, quantity]
  );
  const disabled = useMemo<boolean>(() => {
    const existingItem = cart?.items?.find((item) => {
      const productID =
        typeof item.product === "object" ? item.product?.id : item.product;
      const variantID = item.variant
        ? typeof item.variant === "object"
          ? item.variant?.id
          : item.variant
        : undefined;

      if (productID === product.id) {
        if (product.enableVariants) {
          return variantID === selectedVariant?.id;
        }

        return true;
      }
    });

    if (existingItem) {
      const existingQuantity = existingItem.quantity;

      if (product.enableVariants) {
        return existingQuantity >= (selectedVariant?.inventory || 0);
      }
      return existingQuantity >= (product.inventory || 0);
    }

    if (product.enableVariants) {
      if (!selectedVariant) {
        console.log("No variant selected");
        return true;
      }

      if (selectedVariant.inventory === 0) {
        console.log("Variant is out of stock");
        return true;
      }
    } else {
      if (product.inventory === 0) {
        console.log("Product is out of stock");
        return true;
      }
    }

    return false;
  }, [selectedVariant, cart?.items, product]);

  return (
    <Button
      aria-label={t("addToCart")}
      variant={"outline"}
      className={clsx({
        "hover:opacity-90": true,
        "w-full": true,
      })}
      disabled={disabled}
      onClick={addToCart}
      type="submit"
    >
      {messageAction}
    </Button>
  );
}
