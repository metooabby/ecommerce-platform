import express from "express";
import cors from "cors";

import { authMiddleware } from "../auth/auth.middleware.js";
import { requestContext } from "../logger/requestContext.js";
import { requestLogger } from "../middleware/requestLogger.js";
import { errorHandler } from "../middleware/errorHandler.js";

import { getAllProducts } from "../services/index.js";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";

import { typeDefs } from "../graphql/schema.js";
import { resolvers } from "../graphql/resolvers.js";
import { createContext, type GraphQLContext } from "../graphql/context.js";

export async function createApp() {
  const app = express();

  // 1️⃣ Request context (adds requestId)
  app.use(requestContext);

   // 2️⃣ AUTH
  app.use(authMiddleware);

  // 2️⃣ CORS
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://studio.apollographql.com",
      ]
    })
  );

  // 3️⃣ Apollo Server
  const apolloServer = new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  });

  await apolloServer.start();

  // 4️⃣ GraphQL — JSON ONLY FOR POST
  app.use(
    "/graphql",
    (req, res, next) => {
      if (req.method === "POST") {
        return express.json()(req, res, next);
      }
      next();
    },
    expressMiddleware<GraphQLContext>(apolloServer, {
      context: async ({ req }) => createContext(req),
    })
  );

  // 5️⃣ REST (JSON OK here)
  app.use(express.json());

  app.get("/products", async (_req, res, next) => {
    try {
      const products = await getAllProducts();
      res.json(products);
    } catch (err) {
      next(err);
    }
  });

  // 6️⃣ Logger
  app.use(requestLogger);

  // 7️⃣ Error handler (LAST)
  app.use(errorHandler);

  return app;
}
