import { apiFetch } from "./client";

export interface ProductVariant {
  id: string;
  sku: string;
  attributes: Record<string, unknown>;
  inventoryCount: number;
  priceCents: number;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  variants: ProductVariant[];
}

export async function fetchProducts(): Promise<Product[]> {
  return apiFetch<Product[]>("/products");
}
