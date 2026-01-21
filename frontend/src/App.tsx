import { useEffect, useState } from "react";
import { fetchProducts } from "./api/products";
import type { Product } from "./api/products";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(products, null, 2)}
      </pre>
    </div>
  );
}
