import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onNavigateHome?: () => void;
  cartCount?: number;
  onNavigateCheckout?: () => void;
}

export function AppLayout({
  children,
  onNavigateHome,
  cartCount,
  onNavigateCheckout
}: Props) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            className="text-xl font-bold text-blue-600"
            onClick={onNavigateHome}
          >
            E-Commerce
          </button>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Demo Store</span>

            {cartCount !== undefined && (
              <button
                onClick={onNavigateCheckout}
                className="relative text-sm font-medium"
              >
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
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
