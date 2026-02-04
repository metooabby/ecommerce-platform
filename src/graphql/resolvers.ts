import { withErrorHandling } from "./resolverWrapper.js";
import type { GraphQLContext } from "./context.js";
import { getAllProducts } from "../services/index.js";
import { createOrder } from "../services/order/order.service.js";
import { createPaymentIntent } from "../services/payment/payment.service.js";
import { prisma } from "../db/prisma.js";

export const resolvers = {
  Query: {
    products: withErrorHandling<
      unknown,              // parent
      unknown,              // args
      GraphQLContext,       // context
      ReturnType<typeof getAllProducts>
    >(
      async (_parent, _args, _ctx) => {
        return getAllProducts();
      }
    ),
  },

  Mutation: {
    placeOrder: withErrorHandling<
      unknown,
      {
        items: {
          variantId: string;
          quantity: number;
        }[];
      },
      GraphQLContext,
      { orderId: string }
    >(
      async (_parent, args, ctx) => {
        return createOrder({
          userId: ctx.user!.id,
          items: args.items,
        });
      }
    ),

    createPaymentIntent: withErrorHandling<
      unknown,
      { orderId: string },
      GraphQLContext,
      {
        paymentId: string;
        razorpayOrderId: string;
        amount: number;
        currency: string;
      }
    >(
      async (_parent, args, ctx) => {
        return createPaymentIntent({
          orderId: args.orderId,
          user: ctx.user,
          prisma,
        });
      }
    ),
  },
};
