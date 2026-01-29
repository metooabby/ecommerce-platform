import { withTransaction } from "../../db/transaction.js";
import { decrementInventory } from "../product/inventory.service.js";

export async function createOrder(params: {
  userId: string;
  variantId: string;
  quantity: number;
}) {
  return withTransaction(async (client) => {
    await decrementInventory(
      client,
      params.variantId,
      params.quantity
    );

    const priceResult = await client.query(
      `
  SELECT price_cents
  FROM product_prices
  WHERE variant_id = $1
    AND valid_to IS NULL
  `,
      [params.variantId]
    );

    if (priceResult.rowCount === 0) {
      throw new Error("Active price not found");
    }

    const priceCents = priceResult.rows[0].price_cents;
    const totalAmount = priceCents * params.quantity;


    const orderResult = await client.query(
      `
      INSERT INTO orders (user_id, status, total_amount_cents)
      VALUES ($1, 'PAID', $2)
      RETURNING id
      `,
      [params.userId, totalAmount]
    );

    const orderId = orderResult.rows[0].id;

    await client.query(
      `
      INSERT INTO order_items (
        order_id,
        product_name,
        sku,
        price_cents,
        quantity
      )
      SELECT
        $1,
        p.name,
        v.sku,
        pr.price_cents,
        $2
      FROM product_variants v
      JOIN products p ON p.id = v.product_id
      JOIN product_prices pr ON pr.variant_id = v.id
      WHERE v.id = $3
        AND pr.valid_to IS NULL
      `,
      [orderId, params.quantity, params.variantId]
    );

    return { orderId };
  });
}
