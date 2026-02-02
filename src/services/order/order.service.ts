import type { PoolClient } from "pg";
import { withTransaction } from "../../db/transaction.js";
import { decrementInventory } from "../product/inventory.service.js";

/* -------------------- helpers -------------------- */

function aggregateItems(
  items: { variantId: string; quantity: number }[]
) {
  const map = new Map<string, number>();

  for (const item of items) {
    map.set(
      item.variantId,
      (map.get(item.variantId) ?? 0) + item.quantity
    );
  }

  return Array.from(map.entries()).map(
    ([variantId, quantity]) => ({
      variantId,
      quantity,
    })
  );
}

async function calculateTotal(
  client: PoolClient,
  items: { variantId: string; quantity: number }[]
) {
  let total = 0;

  for (const item of items) {
    const result = await client.query<{ price_cents: number }>(
      `
      SELECT pr.price_cents
      FROM product_prices pr
      WHERE pr.variant_id = $1
        AND pr.valid_to IS NULL
      `,
      [item.variantId]
    );

    if (result.rowCount === 0) {
      throw new Error("Price not found for variant");
    }

    total += result.rows[0].price_cents * item.quantity;
  }

  return total;
}

/* -------------------- service -------------------- */

export async function createOrder(params: {
  userId: string;
  items: { variantId: string; quantity: number }[];
}) {
  const aggregatedItems = aggregateItems(params.items);

  return withTransaction(async (client: PoolClient) => {
    // 1️⃣ Decrement inventory ONCE per variant
    for (const item of aggregatedItems) {
      await decrementInventory(
        client,
        item.variantId,
        item.quantity
      );
    }

    // 2️⃣ Calculate total from ORIGINAL cart items
    const totalAmount = await calculateTotal(client, params.items);

    // 3️⃣ Create order
    const orderResult = await client.query(
      `
      INSERT INTO orders (user_id, status, total_amount_cents)
      VALUES ($1, 'PAID', $2)
      RETURNING id
      `,
      [params.userId, totalAmount]
    );

    const orderId: string = orderResult.rows[0].id;

    // 4️⃣ Insert order_items (preserve cart shape)
    for (const item of params.items) {
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
        [orderId, item.quantity, item.variantId]
      );
    }

    return { orderId };
  });
}
