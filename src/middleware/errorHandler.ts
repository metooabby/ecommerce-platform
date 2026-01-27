import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Never throw from the error handler
  const message =
    err instanceof Error ? err.message : "Internal server error";

  res.status(500).json({
    message,
  });
}
