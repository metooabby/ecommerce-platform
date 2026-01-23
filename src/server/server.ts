import { createApp } from "./app";
import { env } from "../config";

async function startServer() {
  const app = await createApp();

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
}

startServer();
