import { pool } from "./db/client.js";

async function start() {
  console.log("Starting backend...");

  const result = await pool.query("SELECT 1");
  if (result.rowCount !== 1) {
    throw new Error("Database health check failed");
  }

  console.log("Database connected successfully");
}

start().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});