import { DomainError } from "./DomainError.js";

/**
 * Thrown when quantity is invalid
 */
export class InvalidQuantityError extends DomainError {
  constructor(quantity: number) {
    super(
      "Invalid order quantity",
      "INVALID_QUANTITY",
      { quantity }
    );
  }
}

/**
 * Thrown when an order cannot be created
 * due to a business rule violation
 */
export class OrderCreationError extends DomainError {
  constructor(reason: string, details?: Record<string, unknown>) {
    super(
      "Order could not be created",
      "ORDER_CREATION_FAILED",
      { reason, ...details }
    );
  }
}
