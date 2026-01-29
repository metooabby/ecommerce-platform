import { graphqlRequest } from "./graphqlClient";

export interface Product {
  id: string;
  name: string;
  variants: {
    id: string;
    sku: string;
    priceCents: number;
    inventoryCount: number;
  }[];
}

export async function fetchProducts(): Promise<Product[]> {
  const data = await graphqlRequest<{
    products: Product[];
  }>(`
    query {
      products {
        id
        name
        variants {
          id
          sku
          priceCents
          inventoryCount
        }
      }
    }
  `);

  return data.products;
}
