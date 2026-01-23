import type { Request, Response, NextFunction } from "express";
import { log } from "../logger/index.js";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  log("error", "request failed", {
    requestId: req.requestId,
    error:
      err instanceof Error
        ? { message: err.message, stack: err.stack }
        : err
  });

  res.status(500).json({
    error: "Internal server error",
    requestId: req.requestId
  });
}
