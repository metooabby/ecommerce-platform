import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  cartCount?: number;
}

export function AppLayout({ children, cartCount }: Props) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            className="text-xl font-bold text-blue-600 py-2"
            onClick={() => navigate("/products")}
          >
            E-Commerce
          </button>

          <div className="relative">
            <button
              className="text-sm font-medium py-2"
              onClick={() => navigate("/checkout")}
            >
              Cart
            </button>

            {cartCount && cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs px-2 py-0.5
           rounded-full transition-transform hover:scale-110">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-6">
        {children}
      </main>
    </div>
  );
}
