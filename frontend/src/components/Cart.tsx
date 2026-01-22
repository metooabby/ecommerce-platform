import type { CartItem } from "../types/cart";
import { formatCurrency } from "../utils/currency";

interface Props {
    items: CartItem[];
    onRemove: (variantId: string) => void;
}

export function Cart({ items, onRemove }: Props) {
    if (items.length === 0) {
        return (
            <div className="p-4 border rounded bg-gray-50 text-sm text-gray-600">
                Your cart is empty. Add products to get started.
            </div>
        );
    }

    const total = items.reduce(
        (sum, item) => sum + item.priceCents * item.quantity,
        0
    );

    return (
        <div className="p-4 border rounded bg-gray-50 space-y-3">
            <h2 className="text-lg font-semibold">Cart</h2>
            {items.map((item) => (
                <div
                    key={item.variantId}
                    className="flex justify-between items-center text-sm"
                >
                    <div>
                        <div className="font-medium">{item.sku}</div>
                        <div className="text-gray-500">
                            {item.quantity} × {formatCurrency(item.priceCents)}
                        </div>
                    </div>

                    <button
                        className="text-red-600 text-xs duration-150 ease-out hover:scale-[1.02] active:scale-[0.98]"
                        onClick={() => onRemove(item.variantId)}
                    >
                        Remove
                    </button>
                </div>
            ))}

            <div className="pt-2 border-t text-sm font-semibold">
                Total: {formatCurrency(total)}
            </div>
        </div>
    );
}
