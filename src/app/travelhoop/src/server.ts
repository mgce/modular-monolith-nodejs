import "reflect-metadata";
import { Logger } from "@travelhoop/infrastructure-types";
import { Server } from "http";
import { loadEnvs } from "./config";
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
  const container = await setupContainer({ appConfig, dbConfig, appModules });

  process.on("uncaughtException", err => {
    container.resolve<Logger>("logger").error(`Uncaught: ${err.toString()}`, err);
    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    if (err) {
      container.resolve<Logger>("logger").error(`Unhandled: ${err.toString()}`, err);
    }
    process.exit(1);
  });

  const server: Server = container.resolve("server");

  const port = container.resolve("port");
  server.listen(port);
  container.resolve<Logger>("logger").info(`listening on port: ${port}`);
})();
