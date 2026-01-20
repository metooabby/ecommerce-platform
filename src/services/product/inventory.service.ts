import { PoolClient } from "pg";
import { InsufficientInventoryError } from "../../utils/errors/inventory.error.js";

export async function decrementInventory(
  client: PoolClient,
  variantId: string,
  quantity: number
): Promise<void> {
  const result = await client.query(
    `
    UPDATE product_variants
    SET inventory_count = inventory_count - $1
    WHERE id = $2
      AND inventory_count >= $1
    `,
    [quantity, variantId]
  );

  if (result.rowCount !== 1) {
    throw new InsufficientInventoryError();
  }
}
