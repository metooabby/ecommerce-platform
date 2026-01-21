import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import type { Product } from "../api/products";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../hooks/useCart";
import { Cart } from "../components/Cart";

export function ProductListPage() {
  const cart = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6">Loading products…</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 grid gap-6 sm:grid-cols-2">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={cart.addItem}
            />
          ))}
        </div>

        <Cart
          items={cart.items}
          onRemove={cart.removeItem}
        />
      </div>
    </div>
  );
}
