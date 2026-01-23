import { GraphQLScalarType, Kind } from "graphql";
import { getAllProducts } from "../services/index.js";
import type { GraphQLContext } from "./context.js";

export const resolvers = {
  JSON: new GraphQLScalarType({
    name: "JSON",
    serialize(value) {
      return value;
    }
  }),

  Query: {
    products: async (
      _parent: unknown,
      _args: unknown,
      ctx: GraphQLContext
    ) => {
      return getAllProducts();
    }
  }
};
