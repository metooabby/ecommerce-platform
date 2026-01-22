import { useState } from "react";
import type { CartItem } from "../types/cart";
import { formatCurrency } from "../utils/currency";

interface Props {
  items: CartItem[];
  submitting: boolean;
  onBack: () => void;
  onSubmit: () => Promise<void>;
  onOrderComplete: () => void;
}

export function CheckoutPage({
  items,
  submitting,
  onBack,
  onSubmit,
  onOrderComplete
}: Props) {
  const [success, setSuccess] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0
  );

  async function handleSubmit() {
    await onSubmit();
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center animate-pop-in">
        <h1 className="text-2xl font-bold text-green-600 mb-2">
          Order placed successfully
        </h1>
        <p className="text-gray-600 mb-6">
          This is a mocked checkout. Backend integration comes later.
        </p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => {
            onOrderComplete(); // ✅ clear cart here
            onBack();
          }}
        >
          Back to products
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="border rounded p-4 space-y-3 mb-4">
        {items.map((item) => (
          <div
            key={item.variantId}
            className="flex justify-between text-sm"
          >
            <span>
              {item.sku} × {item.quantity}
            </span>
            <span>
              {formatCurrency(item.priceCents * item.quantity)}
            </span>
          </div>
        ))}

        <div className="pt-2 border-t font-semibold text-sm">
          Total: {formatCurrency(total)}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <button
          className="text-sm text-gray-600 disabled:opacity-50
                     transition duration-150 ease-out
                     hover:scale-[1.02] active:scale-[0.98]"
          onClick={onBack}
          disabled={submitting}
        >
          ← Back
        </button>

        <button
          className="px-4 py-2 bg-green-600 text-white rounded
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition duration-150 ease-out
                     hover:scale-[1.02] active:scale-[0.98]"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Placing order…" : "Place Order"}
        </button>
      </div>
    </div>
  );
}
