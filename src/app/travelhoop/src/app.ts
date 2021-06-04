import { AppModule, DbConnection } from "@travelhoop/infrastructure";
import express, { Application } from "express";
import { MiddlewareType } from "@travelhoop/abstract-core";
import { RedisClient as Redis } from "redis";

interface AppDependencies {
  errorHandler: MiddlewareType;
  modules: AppModule[];
  dbConnection: DbConnection;
  redis: Redis;
}

export const createApp = ({ errorHandler, modules, dbConnection, redis }: AppDependencies): Application => {
  const app = express();

  app.use(express.json());

  modules.forEach(m => m.use(app, { dbConnection, redis }));

  app.get("/", (_req, res) => {
    res.json("Travelhoop!");
  });

  app.use(errorHandler);

  return app;
};
