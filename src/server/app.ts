import express from "express";
import { requestLogger } from "./middleware/requestLogger.js";
import { errorHandler } from "./middleware/errorHandler.js";

export function createApp() {
    const app = express();

    app.use(express.json());
    app.use(requestLogger);

    app.get("/health", (_req, res) => {
        res.status(200).json({ status: "ok" });
    });

    app.get("/error", () => {
        throw new Error("Test failure");
    });

    app.use(errorHandler);

    return app;
}
