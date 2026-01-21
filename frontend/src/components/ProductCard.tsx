import type { Product } from "../api/products";
import { formatCurrency } from "../utils/currency";
import type { CartItem } from "../types/cart";

interface Props {
  product: Product;
  onAddToCart: (item: CartItem) => void;
}

export function ProductCard({ product, onAddToCart }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h2 className="text-lg font-semibold">{product.name}</h2>

      {product.description && (
        <p className="text-sm text-gray-600 mt-1">
          {product.description}
        </p>
      )}

      <div className="mt-4 space-y-2">
        {product.variants.map((variant) => {
          const inStock = variant.inventoryCount > 0;

          return (
            <div
              key={variant.id}
              className="flex items-center justify-between border rounded p-2"
            >
              <div>
                <div className="text-sm font-medium">{variant.sku}</div>
                <div className="text-xs text-gray-500">
                  {formatCurrency(variant.priceCents)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    inStock
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {inStock ? "In Stock" : "Out of Stock"}
                </span>

                <button
                  disabled={!inStock}
                  className={`text-xs px-3 py-1 rounded ${
                    inStock
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    onAddToCart({
                      variantId: variant.id,
                      sku: variant.sku,
                      priceCents: variant.priceCents,
                      quantity: 1
                    })
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
