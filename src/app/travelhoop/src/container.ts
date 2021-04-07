import { asFunction, asValue, createContainer } from "awilix";
import { createLogger } from "@travelhoop/infrastructure";
import { Application } from "express";
import * as http from "http";
import { createApp } from "./app";
import { AppConfig } from "./config/config";

interface ContainerDependencies {
  appConfig: AppConfig;
}

export const setupContainer = ({ appConfig }: ContainerDependencies) => {
  const container = createContainer();

  container.register({
    port: asValue(appConfig.app.port),
    app: asFunction(createApp),
    logger: asValue(createLogger(process.env)),
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
