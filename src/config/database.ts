import { env } from "./env";

export const databaseConfig = {
  host: env.database.host,
  port: env.database.port,
  user: env.database.user,
  password: env.database.password,
  database: env.database.name,
  ssl: env.nodeEnv === "production"
};
