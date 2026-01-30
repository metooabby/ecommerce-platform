import { gql } from "@apollo/client";

export const PLACE_ORDER = gql`
  mutation PlaceOrder($variantId: ID!, $quantity: Int!) {
    placeOrder(variantId: $variantId, quantity: $quantity) {
      orderId
    }
  }
`;
