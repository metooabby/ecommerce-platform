import express from "express";
import cors from "cors";
import { requestLogger } from "./middleware/requestLogger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { getAllProducts } from "../services/index.js";
import { createOrder } from "../services/order/order.service.js";

export function createApp() {
    const app = express();
    // Enable CORS for frontend
    app.use(
        cors({
            origin: "http://localhost:5173"
        })
    );
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

    app.post("/checkout", async (_req, res, next) => {
        try {
            const result = await createOrder({
                userId: "5b9c2057-f049-4a29-ac6d-869a3aa653e3",
                variantId: "d0c41c07-3da9-40fe-a1b3-5f5ae029ebed",
                quantity: 1,
                priceCents: 299900
            });

            res.json(result);
        } catch (err) {
            next(err);
        }
    });

    app.use(errorHandler);

    return app;
}
