import { useState } from "react";
import type { CartItem } from "../types/cart";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(item: CartItem) {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.variantId === item.variantId
      );

      if (existing) {
        return prev.map((i) =>
          i.variantId === item.variantId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      return [...prev, item];
    });
  }

  function removeItem(variantId: string) {
    setItems((prev) =>
      prev.filter((i) => i.variantId !== variantId)
    );
  }

  function updateQuantity(variantId: string, quantity: number) {
    if (quantity <= 0) return removeItem(variantId);

    setItems((prev) =>
      prev.map((i) =>
        i.variantId === variantId ? { ...i, quantity } : i
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };
}
