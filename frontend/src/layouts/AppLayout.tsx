import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onNavigateHome?: () => void;
}

export function AppLayout({ children, onNavigateHome }: Props) {
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

          <span className="text-sm text-gray-500">
            Demo Store
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-6">
        {children}
      </main>
    </div>
  );
}
