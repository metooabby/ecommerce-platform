import dotenv from "dotenv";

dotenv.config();

export const env = {
  databaseUrl: process.env.DATABASE_URL as string
};

if (!env.databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}
