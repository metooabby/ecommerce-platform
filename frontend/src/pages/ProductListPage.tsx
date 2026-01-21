import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import type { Product } from "../api/products";
import { ProductCard } from "../components/ProductCard";
import { Cart } from "../components/Cart";
import { useCart } from "../hooks/useCart";
import { CheckoutPage } from "./CheckoutPage";
import { AppLayout } from "../layouts/AppLayout";

export function ProductListPage() {
  const cart = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [view, setView] = useState<"products" | "checkout">("products");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  async function submitOrder() {
    setSubmitting(true);

    // mocked delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setSubmitting(false);
    setSuccess(true);
    cart.clearCart();
  }

  /* -------------------- CHECKOUT VIEW -------------------- */
  if (view === "checkout") {
    return (
      <AppLayout
        cartCount={cart.items.length}
        onNavigateHome={() => setView("products")}
      >
        <CheckoutPage
          items={cart.items}
          submitting={submitting}
          success={success}
          onBack={() => {
            setSuccess(false);
            setView("products");
          }}
          onSubmit={submitOrder}
        />
      </AppLayout>
    );
  }

  /* -------------------- LOADING / ERROR -------------------- */
  if (loading) {
    return (
      <AppLayout cartCount={cart.items.length}>
        <div className="p-6 text-gray-600">Loading products…</div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout cartCount={cart.items.length}>
        <div className="p-6 text-red-600">{error}</div>
      </AppLayout>
    );
  }

  /* -------------------- PRODUCTS VIEW -------------------- */
  return (
    <AppLayout
      cartCount={cart.items.length}
      onNavigateCheckout={() => {
        if (cart.items.length > 0) {
          setView("checkout");
        }
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Product Grid */}
        <div className="lg:col-span-3 grid gap-6 sm:grid-cols-2">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={cart.addItem}
            />
          ))}
        </div>

        {/* Cart Sidebar */}
        <div className="space-y-4">
          {cart.items.length > 0 && (
            <button
              className="w-full px-4 py-2 bg-green-600 text-white rounded"
              onClick={() => setView("checkout")}
            >
              Proceed to Checkout
            </button>
          )}

          <Cart
            items={cart.items}
            onRemove={cart.removeItem}
          />
        </div>
      </div>
    </AppLayout>
  );
}
