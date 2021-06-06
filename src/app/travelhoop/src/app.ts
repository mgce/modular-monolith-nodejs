import { AppModule, DbConnection, MiddlewareType } from "@travelhoop/infrastructure";
import express, { Application } from "express";
import { RedisClient as Redis } from "redis";

interface AppDependencies {
  errorHandler: MiddlewareType;
  requestContext: MiddlewareType;
  modules: AppModule[];
  dbConnection: DbConnection;
  redis: Redis;
}

export const createApp = ({
  errorHandler,
  requestContext,
  modules,
  dbConnection,
  redis,
}: AppDependencies): Application => {
  const app = express();

  app.use(express.json());

  app.use(requestContext);

  modules.forEach(m => m.use(app, { dbConnection, redis }));

  app.get("/", (_req, res) => {
    res.json("Travelhoop!");
  });

  app.use(errorHandler);

  return app;
};
