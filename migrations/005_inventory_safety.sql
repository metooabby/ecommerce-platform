-- Ensure inventory never goes negative
ALTER TABLE product_variants
ADD CONSTRAINT inventory_non_negative
CHECK (inventory_count >= 0);

-- Index for high-contention updates
CREATE INDEX idx_variant_inventory ON product_variants(id, inventory_count);
