import type { Request } from "express";
import { pool } from "../db/client.js";

export interface GraphQLContext {
  requestId?: string;
  db: typeof pool;
}

export function createContext(req: Request): GraphQLContext {
  return {
    requestId: req.requestId,
    db: pool
  };
}
