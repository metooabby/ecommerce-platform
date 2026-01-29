import type { Request, Response, NextFunction } from "express";

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace("Bearer ", "");

  if (token === "dev-user") {
    req.user = {
      id: "dev-user",
      email: "dev-user@example.com", // ✅ REQUIRED
      role: "USER",
    };
  } else {
    req.user = null;
  }

  next();
}
