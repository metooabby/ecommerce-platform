import { withErrorHandling } from "./resolverWrapper.js";
import type { GraphQLContext } from "./context.js";
import { getAllProducts } from "../services/index.js";

export const resolvers = {
  Query: {
    products: withErrorHandling(
      async (_: unknown, __: unknown, _ctx: GraphQLContext) => {
        return getAllProducts();
      }
    ),
  },
};
