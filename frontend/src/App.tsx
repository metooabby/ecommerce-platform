import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { ProductListPage } from "./pages/ProductListPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { useCart } from "./hooks/useCart";
import { AppLayout } from "./layouts/AppLayout";

export default function App() {
  const cart = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function submitOrder() {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitting(false);
    setSuccess(true);
    cart.clearCart();
  }

  return (
    <BrowserRouter>
      <AppLayout cartCount={cart.items.length}>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />

          <Route
            path="/products"
            element={<ProductListPage cart={cart} />}
          />

          <Route
            path="/checkout"
            element={
              cart.items.length === 0 ? (
                <Navigate to="/products" replace />
              ) : (
                <CheckoutPage
                  items={cart.items}
                  submitting={submitting}
                  success={success}
                  onBack={() => setSuccess(false)}
                  onSubmit={submitOrder}
                />
              )
            }
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
