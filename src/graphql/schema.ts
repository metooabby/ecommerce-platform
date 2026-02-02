export const typeDefs = `
  type ProductVariant {
    id: ID!
    sku: String!
    priceCents: Int!
    inventoryCount: Int!
  }

  type Product {
    id: ID!
    name: String!
    description: String
    variants: [ProductVariant!]!
  }

  type Query {
    products: [Product!]!
  }

  """
  Input for a single cart item during checkout
  """
  input OrderItemInput {
    variantId: ID!
    quantity: Int!
  }

  type PlaceOrderResult {
    orderId: ID!
  }

  type Mutation {
    placeOrder(items: [OrderItemInput!]!): PlaceOrderResult!
  }
`;
