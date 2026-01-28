import { withErrorHandling } from "./resolverWrapper.js";
import type { GraphQLContext } from "./context.js";
import { getAllProducts } from "../services/index.js";
import { GraphQLError } from "graphql";
import { requireRole } from "../auth/auth.guard.js";


export const resolvers = {
  Query: {
    products: withErrorHandling(
      async (_parent: unknown, _args: unknown, ctx: GraphQLContext) => {
        if (!ctx.user) {
          throw new GraphQLError("Not authenticated", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }

        return getAllProducts();
      }
    ),
  },
  Mutation: {
    // 🔒 Example admin-only mutation
    adminPing: withErrorHandling(
      async (_parent, _args, ctx: GraphQLContext) => {
        requireRole(ctx.user, ["ADMIN"]);
        return "pong";
      }
    ),
  },
};
