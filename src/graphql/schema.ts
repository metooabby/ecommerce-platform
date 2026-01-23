export const typeDefs = `#graphql
  type ProductVariant {
    id: ID!
    sku: String!
    priceCents: Int!
    inventoryCount: Int!
    attributes: JSON
  }

  type Product {
    id: ID!
    name: String!
    description: String
    variants: [ProductVariant!]!
  }

  scalar JSON

  type Query {
    products: [Product!]!
  }
`;
