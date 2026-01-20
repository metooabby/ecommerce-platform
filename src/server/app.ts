import express from "express";
import { requestLogger } from "./middleware/requestLogger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { getAllProducts } from "../services/index.js";
import { createOrder } from "../services/order/order.service.js";

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

    app.post("/checkout", async (_req, res, next) => {
        try {
            const result = await createOrder({
                userId: "REPLACE_WITH_REAL_USER_ID",
                variantId: "REPLACE_WITH_VARIANT_ID",
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
