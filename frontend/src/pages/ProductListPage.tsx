import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import type { Product } from "../api/products";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../hooks/useCart";
import { Cart } from "../components/Cart";
import { CheckoutPage } from "./CheckoutPage";

export function ProductListPage() {
    const cart = useCart();
    const [view, setView] = useState<"products" | "checkout">("products");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts()
            .then(setProducts)
            .catch(() => setError("Failed to load products"))
            .finally(() => setLoading(false));
    }, []);

    async function submitOrder() {
        setSubmitting(true);

        await new Promise((resolve) => setTimeout(resolve, 1200));

        setSubmitting(false);
        setSuccess(true);
        cart.clearCart();
    }

    if (view === "checkout") {
        return (
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
        );
    }

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
                {cart.items.length > 0 && (
                    <button
                        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
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
    );
}
