import type { Request, Response, NextFunction } from "express";
import { decodeAuthToken } from "./auth.utils.js";

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  const token = authHeader?.replace("Bearer ", "");
  const user = decodeAuthToken(token);

  req.user = user;
  next();
}
