import { VariantOutOfStockError } from "../../domain/errors/ProductErrors.js";
import type { PoolClient } from "pg";

/**
 * Decrements inventory safely using row-level locking
 */
export async function decrementInventory(
  client: PoolClient,
  variantId: string,
  quantity: number
) {
  // Lock the row to prevent concurrent decrements
  const result = await client.query<{
    inventory_count: number;
  }>(
    `
    SELECT inventory_count
    FROM product_variants
    WHERE id = $1
    FOR UPDATE
    `,
    [variantId]
  );

  if (result.rowCount === 0) {
    throw new VariantOutOfStockError(variantId, 0);
  }

  const available = result.rows[0].inventory_count;

  if (available < quantity) {
    throw new VariantOutOfStockError(variantId, available);
  }

  await client.query(
    `
    UPDATE product_variants
    SET inventory_count = inventory_count - $1
    WHERE id = $2
    `,
    [quantity, variantId]
  );
}
