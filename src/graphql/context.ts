import type { Request } from "express";
import type { AuthUser } from "../auth/auth.types.js";

export interface GraphQLContext {
  user: AuthUser | null;
}

export function createContext(req: Request): GraphQLContext {
  return {
    user: req.user ?? null,
  };
}
