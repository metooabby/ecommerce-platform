import express from "express";
import { requestLogger } from "./middleware/requestLogger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { getAllProducts } from "../services/index.js";

export function createApp() {
    const app = express();

    app.use(express.json());
    app.use(requestLogger);

    app.get("/health", (_req, res) => {
        res.status(200).json({ status: "ok" });
    });

    app.get("/products", async (_req, res, next) => {
        try {
            const products = await getAllProducts();
            res.json(products);
        } catch (err) {
            next(err);
        }
    });
    
    app.get("/error", () => {
        throw new Error("Test failure");
    });

    app.use(errorHandler);

    return app;
}
