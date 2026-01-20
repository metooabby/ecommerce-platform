import { DomainError } from "./base.error.js";

export class NotFoundError extends DomainError {
  readonly code = "NOT_FOUND";
  readonly statusCode = 404;

  constructor(resource: string) {
    super(`${resource} not found`);
  }
}
