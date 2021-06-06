import { asFunction, asValue, createContainer } from "awilix";
import { createLogger, registerAsArray, AppModule, errorHandler, requestContext } from "@travelhoop/infrastructure";
import { Application } from "express";
import * as http from "http";
import { MikroORM } from "@mikro-orm/core";
import { RedisClient as Redis } from "redis";
import { createApp } from "./app";
import { AppConfig } from "./config/config";
import { DbConfig } from "./config/db-config";

interface ContainerDependencies {
  appConfig: AppConfig;
  dbConfig: DbConfig;
  appModules: AppModule[];
  redis: Redis;
}

export const setupContainer = async ({ appConfig, appModules, dbConfig, redis }: ContainerDependencies) => {
  const container = createContainer();

  const dbConnection = await MikroORM.init(dbConfig);

  container.register({
    port: asValue(appConfig.app.port),
    app: asFunction(createApp),
    logger: asValue(createLogger(process.env)),
    errorHandler: asFunction(errorHandler),
    modules: registerAsArray<any>(appModules.map(appModule => asValue(appModule))),
    dbConnection: asValue(dbConnection),
    redis: asValue(redis),
    requestContext: asFunction(requestContext),
  });

  container.register({
    app: asFunction(createApp).singleton(),
  });

  const app: Application = container.resolve("app");

  container.register({
    server: asValue(http.createServer(app)),
  });

  return container;
};
