import { Request, Response, NextFunction } from "express";
import { DomainError } from "../../utils/errors/base.error.js";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof DomainError) {
    return res.status(err.statusCode).json({
      error: err.code,
      message: err.message
    });
  }

  console.error("Unhandled error:", err);

  res.status(500).json({
    error: "INTERNAL_SERVER_ERROR"
  });
}
