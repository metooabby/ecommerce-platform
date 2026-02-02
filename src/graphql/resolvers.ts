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
        args: {
          items: {
            variantId: string;
            quantity: number;
          }[];
        },
        ctx: GraphQLContext
      ) => {
        // 🔒 Auth guaranteed by resolver wrapper
        const userId = ctx.user!.id;

        return createOrder({
          userId,
          items: args.items,
        });
      }
    ),
  },
};
