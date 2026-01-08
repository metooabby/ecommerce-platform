-- Products need updated_at for audit triggers
ALTER TABLE products
ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- Ensure consistency for future tables (defensive)
ALTER TABLE categories
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
