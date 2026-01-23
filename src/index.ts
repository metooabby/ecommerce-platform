import { createApp } from "./server/app";
import { env } from "./config";

async function start() {
  const app = await createApp();

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
}

start();