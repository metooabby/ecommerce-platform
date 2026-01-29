import { graphqlRequest } from "./graphqlClient";

export async function fetchProducts() {
  return graphqlRequest<{
    products: {
      id: string;
      name: string;
      variants: {
        id: string;
        sku: string;
        priceCents: number;
        inventoryCount: number;
      }[];
    }[];
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
}
