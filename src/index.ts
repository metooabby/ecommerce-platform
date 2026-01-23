import { createApp } from "./server/app";
import { env } from "./config";

const app = createApp();

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});

