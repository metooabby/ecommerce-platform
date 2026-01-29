export class AuthenticationError extends Error {
  readonly code = "UNAUTHENTICATED";

  constructor(message = "Authentication required") {
    super(message);
  }
}

export class AuthorizationError extends Error {
  readonly code = "FORBIDDEN";

  constructor(message = "Not authorized") {
    super(message);
  }
}
