import express from "express";
import cors from "cors";
import { requestContext } from "../logger/requestContext.js";
import { requestLogger } from "../middleware/requestLogger.js";
import { errorHandler } from "../middleware/errorHandler.js";
import { getAllProducts } from "../services/index.js";
import { createOrder } from "../services/order/order.service.js";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "../graphql/schema.js";
import { resolvers } from "../graphql/resolvers.js";
import { createContext } from "../graphql/context.js";

export async function createApp() {
  const app = express();

  // 1️⃣ Request context
  app.use(requestContext);

  // 2️⃣ CORS
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

  // 3️⃣ JSON BODY PARSER — MUST COME BEFORE GRAPHQL
  app.use(express.json());

  // 4️⃣ Apollo Server
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req }) => createContext(req),
    })
  );

  // 5️⃣ Request logger
  app.use(requestLogger);

  // 6️⃣ REST routes
  app.get("/products", async (_req, res, next) => {
    try {
      const products = await getAllProducts();
      res.json(products);
    } catch (err) {
      next(err);
    }
  });

  // 7️⃣ Error handler LAST
  app.use(errorHandler);

  return app;
}
