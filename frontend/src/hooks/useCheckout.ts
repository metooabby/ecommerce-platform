import { useMutation } from "@apollo/client/react";
import { PLACE_ORDER } from "../graphql/mutations/placeOrder";
import type { CartItem } from "../types/cart";

export function useCheckout(onSuccess: () => void) {
  const [placeOrder, { loading, error }] = useMutation(PLACE_ORDER);

  const submitOrder = async (items: CartItem[]) => {
    if (items.length === 0) return;

    const item = items[0];

    await placeOrder({
      variables: {
        variantId: item.variantId,
        quantity: item.quantity,
      },
    });

    onSuccess();
  };

  return {
    submitOrder,
    loading,
    error,
  };
}
