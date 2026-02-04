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

  input OrderItemInput {
    variantId: ID!
    quantity: Int!
  }

  type PlaceOrderResult {
    orderId: ID!
  }

  type PaymentIntent {
    paymentId: ID!
    razorpayOrderId: String!
    amount: Int!
    currency: String!
  }

  type Mutation {
    placeOrder(items: [OrderItemInput!]!): PlaceOrderResult!
    createPaymentIntent(orderId: ID!): PaymentIntent!
  }

  type VerifyPaymentResult {
    success: Boolean!
}

  extend type Mutation {
    verifyRazorpayPayment(
    orderId: ID!
    razorpayOrderId: String!
    razorpayPaymentId: String!
    razorpaySignature: String!
  ): VerifyPaymentResult!
}
`;
