import "reflect-metadata";
import { DbConnection, Logger } from "@travelhoop/infrastructure-types";
import { createBackgroundMessageDispatcher } from "@travelhoop/infrastructure";
import { Server } from "http";
import { loadEnvs } from "@travelhoop/infrastructure";
import { createClient } from "redis";
import { appConfigFactory } from "./config/config";
import { dbConfigFactory } from "./config/db-config";
import { setupContainer } from "./container";
import { loadModules } from "./module.loader";

loadEnvs();

(async () => {
  const appConfig = appConfigFactory(process.env as any);
  const appModules = loadModules();
  const dbConfig = dbConfigFactory(
    process.env as any,
    appModules.map(appModule => appModule.name),
  );
  const redis = createClient(appConfig.redis.url);
  const container = await setupContainer({ appConfig, dbConfig, appModules, redis });
  const logger = container.resolve<Logger>("logger");
  const dbConnection = container.resolve<DbConnection>("dbConnection");

  await dbConnection.getMigrator().up();

  process.on("uncaughtException", err => {
    logger.error(`Uncaught: ${err.toString()}`, err);
    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    if (err) {
      logger.error(`Unhandled: ${err.toString()}`, err);
    }
    process.exit(1);
  });

  const server: Server = container.resolve("server");
  const port = container.resolve("port");

  createBackgroundMessageDispatcher({ redis, logger, modules: appModules, queueName: appConfig.queues.messageBroker });
  server.listen(port);

  logger.info(`listening on port: ${port}`);
})();
