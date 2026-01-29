import { graphqlRequest } from "./graphqlClient";

export async function placeOrder(
  variantId: string,
  quantity: number
) {
  return graphqlRequest<{
    placeOrder: {
      id: string;
    };
  }>(
    `
    mutation PlaceOrder($variantId: ID!, $quantity: Int!) {
      placeOrder(variantId: $variantId, quantity: $quantity) {
        id
      }
    }
    `,
    { variantId, quantity }
  );
}
