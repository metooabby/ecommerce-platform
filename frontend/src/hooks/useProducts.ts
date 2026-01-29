import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products.graphql";

export function useProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data.products))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}
