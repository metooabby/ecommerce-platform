import { GraphQLError } from "graphql";
import { razorpay } from "../../payments/razorpay.client.js";

export async function createPaymentIntent({
  orderId,
  user,
  prisma,
}: {
  orderId: string;
  user: { id: string } | null;
  prisma: any;
}) {
  if (!user) {
    throw new GraphQLError("Unauthorized");
  }

  const order = await prisma.orders.findFirst({
    where: {
      id: orderId,
      user_id: user.id,
    },
  });

  if (!order) {
    throw new GraphQLError("Order not found");
  }

  const existingPayment = await prisma.payments.findFirst({
    where: { order_id: orderId },
  });

  if (existingPayment) {
    throw new GraphQLError("Payment already initiated");
  }

  const razorpayOrder = await razorpay.orders.create({
    amount: order.total_amount * 100,
    currency: "INR",
    receipt: `order_${order.id}`,
  });

  const payment = await prisma.payments.create({
    data: {
      order_id: order.id,
      provider: "RAZORPAY",
      provider_order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: "INR",
      status: "CREATED",
    },
  });

  return {
    paymentId: payment.id,
    razorpayOrderId: razorpayOrder.id,
    amount: Number(razorpayOrder.amount),
    currency: "INR",
  };
}
