"use server";

import config from "@/payload.config";
import { cookies } from "next/headers";
import { getPayload } from "payload";

export async function addToCart(
  productId: number,
  variantId?: number,
  quantity: number = 1
) {
  console.log({ productId, variantId, quantity });
  try {
    const payload = await getPayload({ config });
    const cookieStore = await cookies();
    const token = cookieStore.get("payload-token-customer")?.value;

    if (!token) {
      return { success: false, error: "NOT_AUTHENTICATED" };
    }

    // Get current user
    const { user } = await payload.auth({
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    });
    if (!user) {
      return { success: false, error: "NOT_AUTHENTICATED" };
    }

    // Find existing cart for user
    const existingCarts = await payload.find({
      collection: "carts",
      where: {
        customer: { equals: user.id },
      },
      limit: 1,
    });

    let cart = existingCarts.docs[0];

    if (!existingCarts || !cart) {
      // Create new cart
      cart = await payload.create({
        collection: "carts",
        data: {
          customer: user.id,
          status: "active",
          items: [
            {
              product: productId,
              variant: variantId,
              quantity,
              // purchasedAt: new Date(),
            },
          ],
        },
      });
    } else {
      // Update existing cart
      const existingItems = cart.items || [];
      const itemIndex = existingItems.findIndex((item: any) => {
        const itemProductId =
          typeof item.product === "object" ? item.product?.id : item.product;
        const itemVariantId =
          typeof item.variant === "object" ? item.variant?.id : item.variant;
        return itemProductId === productId && itemVariantId === variantId;
      });

      let updatedItems;
      if (itemIndex >= 0) {
        // Update quantity
        updatedItems = existingItems.map((item: any, index: number) =>
          index === itemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        updatedItems = [
          ...existingItems,
          { product: productId, variant: variantId, quantity },
        ];
      }

      cart = await payload.update({
        collection: "carts",
        id: cart.id,
        data: { items: updatedItems },
      });
    }

    return { success: true, cart };
  } catch (error) {
    console.error("Add to cart error:", error);
    return { success: false, error: "SERVER_ERROR" };
  }
}

export async function getCart() {
  try {
    const payload = await getPayload({ config });
    const cookieStore = await cookies();
    const token = cookieStore.get("payload-token-customer")?.value;

    if (!token) {
      return { success: false, error: "NOT_AUTHENTICATED" };
    }

    const { user } = await payload.auth({
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    });
    if (!user) {
      return { success: false, error: "NOT_AUTHENTICATED" };
    }

    const carts = await payload.find({
      collection: "carts",
      where: {
        customer: { equals: user.id },
      },
      depth: 2,
      limit: 1,
    });

    return { success: true, cart: carts.docs[0] || null };
  } catch (error) {
    return { success: false, error: "SERVER_ERROR" };
  }
}

export async function updateCartItem(
  cartId: number,
  itemId: string,
  quantity: number
) {
  try {
    const payload = await getPayload({ config });
    const cookieStore = await cookies();
    const token = cookieStore.get("payload-token-customer")?.value;

    if (!token) {
      return { success: false, error: "NOT_AUTHENTICATED" };
    }

    const cart = await payload.findByID({
      collection: "carts",
      id: cartId,
    });

    const updatedItems = cart.items
      ?.map((item: any) => (item.id === itemId ? { ...item, quantity } : item))
      .filter((item: any) => item.quantity > 0);

    const updatedCart = await payload.update({
      collection: "carts",
      id: cartId,
      data: { items: updatedItems },
    });

    return { success: true, cart: updatedCart };
  } catch (error) {
    return { success: false, error: "SERVER_ERROR" };
  }
}

export async function removeCartItem(cartId: number, itemId: string) {
  try {
    const payload = await getPayload({ config });
    const cookieStore = await cookies();
    const token = cookieStore.get("payload-token-customer")?.value;

    if (!token) {
      return { success: false, error: "NOT_AUTHENTICATED" };
    }

    const cart = await payload.findByID({
      collection: "carts",
      id: cartId,
    });

    const updatedItems = cart.items?.filter((item: any) => item.id !== itemId);

    const updatedCart = await payload.update({
      collection: "carts",
      id: cartId,
      data: { items: updatedItems },
    });

    return { success: true, cart: updatedCart };
  } catch (error) {
    return { success: false, error: "SERVER_ERROR" };
  }
}
