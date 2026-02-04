import type { Request } from "express";
import type { AuthUser } from "../auth/auth.types.js";

export interface GraphQLContext {
  user: AuthUser | null;
  db: unknown; // ← intentionally untyped Prisma client
}

export function createContext(
  req: Request,
  db: unknown
): GraphQLContext {
  return {
    user: req.user ?? null,
    db,
  };
}
