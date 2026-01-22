import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts, } from "../api/products";
import type { Product, } from "../api/products";
import { ProductCard } from "../components/ProductCard";
import { Cart } from "../components/Cart";
import type { CartItem } from "../types/cart";
import { ProductCardSkeleton } from "../components/ProductCardSkeleton";
import { Skeleton } from "../components/Skeleton";

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (variantId: string) => void;
}

interface Props {
    cart: CartState;
}

export function ProductListPage({ cart }: Props) {
    const navigate = useNavigate();

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
        return (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 grid gap-6 sm:grid-cols-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>

                <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-40 w-full" />
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="p-6 text-red-600">{error}</div>;
    }

    return (
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
                        onClick={() => navigate("/checkout")}
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
