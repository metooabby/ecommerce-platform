export const typeDefs = `
  type Query {
    products: [Product!]!
  }

  type Mutation {
    placeOrder(
      variantId: ID!
      quantity: Int!
    ): PlaceOrderResult!
  }

  type PlaceOrderResult {
    orderId: ID!
  }

  type Product {
    id: ID!
    name: String!
    description: String
    variants: [ProductVariant!]!
  }

  type ProductVariant {
    id: ID!
    sku: String!
    inventoryCount: Int!
    priceCents: Int!
  }
`;
