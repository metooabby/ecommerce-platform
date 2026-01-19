import { query } from "../../db/query.js";
import { Product } from "./product.types.js";

export async function getAllProducts(): Promise<Product[]> {
  const rows = await query<{
    product_id: string;
    product_name: string;
    description: string | null;
    variant_id: string;
    sku: string;
    attributes: Record<string, unknown>;
    inventory_count: number;
    price_cents: number;
  }>(`
    SELECT
      p.id AS product_id,
      p.name AS product_name,
      p.description,
      v.id AS variant_id,
      v.sku,
      v.attributes,
      v.inventory_count,
      pr.price_cents
    FROM products p
    JOIN product_variants v ON v.product_id = p.id
    JOIN product_prices pr ON pr.variant_id = v.id
    WHERE pr.valid_to IS NULL
  `);

  const productMap = new Map<string, Product>();

  for (const row of rows) {
    if (!productMap.has(row.product_id)) {
      productMap.set(row.product_id, {
        id: row.product_id,
        name: row.product_name,
        description: row.description,
        variants: []
      });
    }

    productMap.get(row.product_id)!.variants.push({
      id: row.variant_id,
      sku: row.sku,
      attributes: row.attributes,
      inventoryCount: row.inventory_count,
      priceCents: row.price_cents
    });
  }

  return Array.from(productMap.values());
}
