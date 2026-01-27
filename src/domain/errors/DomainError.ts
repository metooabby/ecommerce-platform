export abstract class DomainError extends Error {
  public readonly code: string;
  public readonly details?: Record<string, unknown>;

  protected constructor(
    message: string,
    code: string,
    details?: Record<string, unknown>
  ) {
    super(message);

    this.name = this.constructor.name;
    this.code = code;
    this.details = details;

    // Required for proper instanceof checks when targeting ES5+
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
