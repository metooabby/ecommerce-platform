import { useState } from "react";
import { placeOrder } from "../api/orders.graphql";

export function useCheckout() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function submitOrder(
    variantId: string,
    quantity: number
  ) {
    setSubmitting(true);
    try {
      await placeOrder(variantId, quantity);
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  }

  return {
    submitOrder,
    submitting,
    success,
    reset: () => setSuccess(false),
  };
}
