import { Pool } from "pg";
import { databaseConfig } from "../config/database.js";

export const pool = new Pool(databaseConfig);
