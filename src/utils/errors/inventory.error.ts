import { DomainError } from "./base.error.js";

export class InsufficientInventoryError extends DomainError {
  readonly code = "INSUFFICIENT_INVENTORY";
  readonly statusCode = 409;

  constructor() {
    super("Insufficient inventory for requested item");
  }
}
