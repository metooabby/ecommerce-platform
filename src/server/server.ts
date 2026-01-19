import { createApp } from "./app.js";

const PORT = process.env.PORT || 4000;

export function startServer() {
  const app = createApp();

  const server = app.listen(PORT, () => {
    console.log(`HTTP server running on port ${PORT}`);
  });

  const shutdown = () => {
    console.log("Graceful shutdown initiated");
    server.close(() => {
      process.exit(0);
    });
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}
