import { withErrorHandling } from "./resolverWrapper.js";
import type { GraphQLContext } from "./context.js";
import { getAllProducts } from "../services/index.js";
import { createOrder } from "../services/order/order.service.js";

export const resolvers = {
  Query: {
    products: withErrorHandling(
      async (_: unknown, __: unknown, _ctx: GraphQLContext) => {
        return getAllProducts();
      }
    ),
  },

  Mutation: {
    placeOrder: withErrorHandling(
      async (
        _: unknown,
        args: { variantId: string; quantity: number },
        ctx: GraphQLContext
      ) => {
        // 🔒 Auth required
        if (!ctx.user) {
          throw new Error("Authentication required");
        }

        // 🧠 Delegate to domain/service layer
        const result = await createOrder({
          userId: ctx.user.id,
          variantId: args.variantId,
          quantity: args.quantity,
        });

        return result;
      }
    ),
  },
};
