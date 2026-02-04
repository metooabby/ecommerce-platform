import crypto from "crypto";
import { GraphQLError } from "graphql";

export async function verifyRazorpayPayment({
  orderId,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
  user,
  prisma,
}: {
  orderId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  user: { id: string } | null;
  prisma: any;
}) {
  if (!user) {
    throw new GraphQLError("Unauthorized");
  }

  // 1️⃣ Fetch payment
  const payment = await prisma.payments.findFirst({
    where: {
      order_id: orderId,
      provider_order_id: razorpayOrderId,
      status: "CREATED",
    },
  });

  if (!payment) {
    throw new GraphQLError("Payment not found or already verified");
  }

  // 2️⃣ Verify signature
  const payload = `${razorpayOrderId}|${razorpayPaymentId}`;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(payload)
    .digest("hex");

  if (expectedSignature !== razorpaySignature) {
    throw new GraphQLError("Invalid payment signature");
  }

  // 3️⃣ Transaction: update payment + order
  await prisma.$transaction([
    prisma.payments.update({
      where: { id: payment.id },
      data: {
        provider_payment_id: razorpayPaymentId,
        status: "SUCCESS",
      },
    }),

    prisma.orders.update({
      where: { id: orderId },
      data: {
        status: "PAID",
      },
    }),
  ]);

  return { success: true };
}
