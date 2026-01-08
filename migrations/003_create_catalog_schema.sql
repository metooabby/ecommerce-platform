-- Categories (supports hierarchy)
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  parent_id UUID REFERENCES categories(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (name, parent_id)
);

-- Products (logical grouping)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category_id UUID NOT NULL REFERENCES categories(id),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Product variants (sellable units)
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sku TEXT NOT NULL UNIQUE,
  attributes JSONB NOT NULL,
  inventory_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Price history (temporal pricing)
CREATE TABLE product_prices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  variant_id UUID NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
  price_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  valid_from TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  valid_to TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_variants_product ON product_variants(product_id);
CREATE INDEX idx_prices_variant ON product_prices(variant_id);
