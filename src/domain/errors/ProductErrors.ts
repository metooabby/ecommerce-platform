import { DomainError } from "./DomainError.js";

/**
 * Thrown when a product does not exist
 */
export class ProductNotFoundError extends DomainError {
  constructor(productId: string) {
    super(
      "Product not found",
      "PRODUCT_NOT_FOUND",
      { productId }
    );
  }
}

/**
 * Thrown when a variant does not exist
 */
export class VariantNotFoundError extends DomainError {
  constructor(variantId: string) {
    super(
      "Product variant not found",
      "VARIANT_NOT_FOUND",
      { variantId }
    );
  }
}

/**
 * Thrown when inventory is insufficient
 */
export class VariantOutOfStockError extends DomainError {
  constructor(variantId: string, available: number) {
    super(
      "Variant is out of stock",
      "OUT_OF_STOCK",
      { variantId, available }
    );
  }
}
