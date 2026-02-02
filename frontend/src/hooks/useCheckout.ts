import { useMutation } from "@apollo/client/react";
import { PLACE_ORDER } from "../graphql/mutations/placeOrder";
import type { CartItem } from "../types/cart";

export function useCheckout(onSuccess?: () => void) {
  const [placeOrder, { loading, error }] = useMutation(PLACE_ORDER);

  async function submitOrder(items: CartItem[]) {
    await placeOrder({
      variables: {
        items: items.map((item) => ({
          variantId: item.variantId,
          quantity: item.quantity,
        })),
      },
    });

    onSuccess?.();
  }

  return {
    submitOrder,
    loading,
    error,
  };
}
