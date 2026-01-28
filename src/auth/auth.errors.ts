export class AuthorizationError extends Error {
  readonly code = "FORBIDDEN";

  constructor(message = "Not authorized") {
    super(message);
  }
}
