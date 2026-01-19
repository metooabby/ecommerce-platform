import { pool } from "./db/client.js";
import { startServer } from "./server/server.js";

async function bootstrap() {
  console.log("Booting backend…");

  await pool.query("SELECT 1");

  startServer();
}

bootstrap().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});
