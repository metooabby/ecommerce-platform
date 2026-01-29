import type { Request, Response, NextFunction } from "express";

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace("Bearer ", "");

  if (token === "dev-user") {
    const DEV_USER_ID = "5b9c2057-f049-4a29-ac6d-869a3aa653e3";
    req.user = {
      id: DEV_USER_ID,
      email: "dev-user@example.com",
      role: "USER",
    };
  } else {
    req.user = null;
  }

  next();
}
